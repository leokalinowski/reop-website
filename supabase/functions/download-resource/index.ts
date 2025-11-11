import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resourceId, leadId } = await req.json()
    
    // Validate required parameters
    if (!resourceId || !leadId) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Validate UUID format
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!UUID_REGEX.test(resourceId) || !UUID_REGEX.test(leadId)) {
      return new Response(JSON.stringify({ error: 'Invalid parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify lead exists
    const { data: lead, error: leadError } = await supabaseClient
      .from('leads')
      .select('id, email')
      .eq('id', leadId)
      .single()

    if (leadError || !lead) {
      return new Response(JSON.stringify({ error: 'Lead not found' }), {
        status: 404,
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
      return new Response(JSON.stringify({ error: 'Could not generate download URL' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(
      JSON.stringify({ 
        downloadUrl: signedUrlData.signedUrl,
        resource: resource
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})