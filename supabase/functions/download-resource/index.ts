import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Time window for valid downloads (24 hours in milliseconds)
const DOWNLOAD_WINDOW_MS = 24 * 60 * 60 * 1000

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resourceId, leadId } = await req.json()
    
    // Validate required parameters
    if (!resourceId || !leadId) {
      console.log('Missing required parameters')
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Validate UUID format
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!UUID_REGEX.test(resourceId) || !UUID_REGEX.test(leadId)) {
      console.log('Invalid UUID format for resourceId or leadId')
      return new Response(JSON.stringify({ error: 'Invalid parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify lead exists and was created recently (within 24 hours)
    const { data: lead, error: leadError } = await supabaseClient
      .from('leads')
      .select('id, email, created_at')
      .eq('id', leadId)
      .single()

    if (leadError || !lead) {
      console.log('Lead not found:', leadId)
      return new Response(JSON.stringify({ error: 'Lead not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Time-based validation: Check if lead was created within the download window
    const leadCreatedAt = new Date(lead.created_at).getTime()
    const now = Date.now()
    const timeSinceCreation = now - leadCreatedAt

    if (timeSinceCreation > DOWNLOAD_WINDOW_MS) {
      console.log('Download window expired for lead:', leadId, 'created:', lead.created_at)
      return new Response(JSON.stringify({ error: 'Download link has expired. Please submit the form again to get a new download link.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Get resource details
    const { data: resource, error: resourceError } = await supabaseClient
      .from('free_resources')
      .select('*')
      .eq('id', resourceId)
      .eq('is_active', true)
      .single()

    if (resourceError || !resource) {
      console.log('Resource not found:', resourceId)
      return new Response(JSON.stringify({ error: 'Resource not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Record download (upsert to handle duplicates)
    await supabaseClient
      .from('resource_downloads')
      .upsert({
        resource_id: resourceId,
        lead_id: leadId
      })

    // Increment download count
    await supabaseClient
      .from('free_resources')
      .update({ download_count: resource.download_count + 1 })
      .eq('id', resourceId)

    // Generate signed URL (valid for 1 hour)
    const { data: signedUrlData, error: urlError } = await supabaseClient
      .storage
      .from('free-resources')
      .createSignedUrl(resource.file_url, 3600)

    if (urlError || !signedUrlData) {
      console.error('Could not generate signed URL:', urlError)
      return new Response(JSON.stringify({ error: 'Could not generate download URL' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log('Download URL generated successfully for lead:', leadId, 'resource:', resourceId)
    
    return new Response(
      JSON.stringify({ 
        downloadUrl: signedUrlData.signedUrl,
        resource: resource
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Download resource error:', error.message)
    return new Response(JSON.stringify({ error: 'An error occurred processing your request' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
