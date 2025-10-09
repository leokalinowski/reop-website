import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting: Track submissions by IP
const submissionTracker = new Map<string, { count: number; resetTime: number }>();
const MAX_SUBMISSIONS_PER_HOUR = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Input validation schemas
interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  sphereSize?: number;
  annualTransactions?: number;
  weeklyHours?: number;
  sphereContactFrequency?: string;
  budgetManagementStyle?: string;
  businessStressLevel?: string;
  biggestChallenge?: string;
  targetIncome?: number;
  startTimeline?: string;
  communicationPreferences?: string[];
  honeypot?: string; // Honeypot field for bot detection
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validatePhone(phone?: string): boolean {
  if (!phone) return true; // Phone is optional
  // Allow various phone formats but limit length
  return phone.length >= 10 && phone.length <= 20;
}

function validateStringLength(value: string | undefined, maxLength: number): boolean {
  if (!value) return true;
  return value.length <= maxLength;
}

function validateNumber(value: number | undefined, min: number, max: number): boolean {
  if (value === undefined || value === null) return true;
  return value >= min && value <= max;
}

function sanitizeInput(input: string): string {
  return input.trim().substring(0, 500); // Limit all text inputs
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = submissionTracker.get(ip);

  if (!record || now > record.resetTime) {
    // New window or expired
    submissionTracker.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }

  if (record.count >= MAX_SUBMISSIONS_PER_HOUR) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  return true;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ 
          error: 'Too many submissions. Please try again later.' 
        }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const leadData: LeadData = await req.json();

    // HONEYPOT CHECK: If honeypot field is filled, it's a bot
    if (leadData.honeypot && leadData.honeypot.length > 0) {
      console.log('Bot detected via honeypot field');
      // Return success to not tip off the bot
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // VALIDATION: Required fields
    if (!leadData.firstName || !leadData.lastName || !leadData.email) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: firstName, lastName, and email are required.' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // VALIDATION: Email format
    if (!validateEmail(leadData.email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid email address format.' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // VALIDATION: String lengths
    if (!validateStringLength(leadData.firstName, 100) || 
        !validateStringLength(leadData.lastName, 100)) {
      return new Response(
        JSON.stringify({ 
          error: 'Name fields are too long (max 100 characters).' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // VALIDATION: Phone number
    if (!validatePhone(leadData.phone)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid phone number format.' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // VALIDATION: Numeric ranges
    if (!validateNumber(leadData.sphereSize, 0, 1000000) ||
        !validateNumber(leadData.annualTransactions, 0, 10000) ||
        !validateNumber(leadData.weeklyHours, 0, 168) ||
        !validateNumber(leadData.targetIncome, 0, 100000000)) {
      return new Response(
        JSON.stringify({ 
          error: 'Numeric values are out of valid range.' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // VALIDATION: Allowed values for select fields
    const allowedContactFrequencies = ['weekly', 'monthly', 'quarterly', 'biannually', 'annually', 'rarely'];
    const allowedBudgetStyles = ['detailed-tracking', 'basic-spreadsheet', 'rough-estimates', 'accountant-handles', 'dont-track'];
    const allowedStressLevels = ['low', 'moderate', 'high', 'severe'];
    const allowedChallenges = ['lead-generation', 'time-management', 'marketing', 'client-management', 'admin-tasks', 'transaction-coordination', 'technology', 'work-life-balance'];
    const allowedTimelines = ['immediately', 'within_month', 'within_quarter', 'within_year'];
    const allowedCommPrefs = ['email', 'phone', 'text', 'video call'];

    if (leadData.sphereContactFrequency && !allowedContactFrequencies.includes(leadData.sphereContactFrequency)) {
      return new Response(
        JSON.stringify({ error: 'Invalid contact frequency value.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (leadData.budgetManagementStyle && !allowedBudgetStyles.includes(leadData.budgetManagementStyle)) {
      return new Response(
        JSON.stringify({ error: 'Invalid budget management style value.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (leadData.businessStressLevel && !allowedStressLevels.includes(leadData.businessStressLevel)) {
      return new Response(
        JSON.stringify({ error: 'Invalid stress level value.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (leadData.biggestChallenge && !allowedChallenges.includes(leadData.biggestChallenge)) {
      return new Response(
        JSON.stringify({ error: 'Invalid challenge value.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (leadData.startTimeline && !allowedTimelines.includes(leadData.startTimeline)) {
      return new Response(
        JSON.stringify({ error: 'Invalid timeline value.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (leadData.communicationPreferences) {
      const invalidPrefs = leadData.communicationPreferences.filter(
        pref => !allowedCommPrefs.includes(pref)
      );
      if (invalidPrefs.length > 0) {
        return new Response(
          JSON.stringify({ error: 'Invalid communication preference value.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Initialize Supabase client with service role for database insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Sanitize and prepare data for insertion
    const sanitizedData = {
      first_name: sanitizeInput(leadData.firstName),
      last_name: sanitizeInput(leadData.lastName),
      email: sanitizeInput(leadData.email.toLowerCase()),
      phone: leadData.phone ? sanitizeInput(leadData.phone) : null,
      sphere_size: leadData.sphereSize || 0,
      annual_transactions: leadData.annualTransactions || 0,
      weekly_hours: leadData.weeklyHours || 0,
      sphere_contact_frequency: leadData.sphereContactFrequency || null,
      budget_management_style: leadData.budgetManagementStyle || null,
      business_stress_level: leadData.businessStressLevel || null,
      biggest_challenge: leadData.biggestChallenge || null,
      target_income: leadData.targetIncome || 0,
      start_timeline: leadData.startTimeline || null,
      communication_preferences: leadData.communicationPreferences || ['email'],
    };

    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert(sanitizedData)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save lead data. Please try again.' 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Trigger PDF generation (non-blocking)
    supabase.functions.invoke('generate-success-analysis', {
      body: leadData
    }).catch(err => console.error('PDF generation error:', err));

    // Trigger GHL webhook (non-blocking)
    supabase.functions.invoke('send-to-ghl-webhook', {
      body: leadData
    }).catch(err => console.error('GHL webhook error:', err));

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Lead submitted successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again.' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
