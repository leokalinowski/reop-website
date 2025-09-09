import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sphereSize: number;
  annualTransactions: number;
  weeklyHours: number;
  sphereContactFrequency: string;
  budgetManagementStyle: string;
  businessStressLevel: string;
  biggestChallenge: string;
  targetIncome: number;
  startTimeline: string;
  communicationPreferences: string[];
}

interface GHLContact {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadData = await req.json();
    console.log('Processing GHL webhook for:', leadData.email);

    const ghlWebhookUrl = Deno.env.get('GHL_WEBHOOK_URL');
    
    if (!ghlWebhookUrl) {
      throw new Error('GHL_WEBHOOK_URL is not configured');
    }

    // Map lead data to GHL-compatible format
    const ghlContact: GHLContact = {
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      email: leadData.email,
      phone: leadData.phone || undefined,
      source: 'Real Estate On Purpose Website',
      tags: generateTags(leadData),
      customFields: {
        sphere_size: leadData.sphereSize,
        annual_transactions: leadData.annualTransactions,
        weekly_hours: leadData.weeklyHours,
        sphere_contact_frequency: leadData.sphereContactFrequency,
        budget_management_style: leadData.budgetManagementStyle,
        business_stress_level: leadData.businessStressLevel,
        biggest_challenge: leadData.biggestChallenge,
        target_income: leadData.targetIncome,
        start_timeline: leadData.startTimeline,
        communication_preferences: leadData.communicationPreferences.join(', '),
        lead_score: calculateLeadScore(leadData),
        created_from: 'Success Analysis Form'
      }
    };

    console.log('Sending data to GHL webhook:', JSON.stringify(ghlContact, null, 2));

    // Send data to Go High Level webhook
    const response = await fetch(ghlWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ghlContact),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL webhook failed: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json().catch(() => ({}));
    console.log('GHL webhook response:', responseData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead sent to Go High Level successfully',
        ghlResponse: responseData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-to-ghl-webhook function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

function generateTags(leadData: LeadData): string[] {
  const tags: string[] = ['Website Lead', 'Success Analysis'];
  
  // Add tags based on business metrics
  if (leadData.sphereSize > 500) {
    tags.push('Large Sphere');
  } else if (leadData.sphereSize > 200) {
    tags.push('Medium Sphere');
  } else if (leadData.sphereSize > 0) {
    tags.push('Small Sphere');
  }

  if (leadData.annualTransactions > 20) {
    tags.push('High Producer');
  } else if (leadData.annualTransactions > 10) {
    tags.push('Medium Producer');
  } else if (leadData.annualTransactions > 0) {
    tags.push('Low Producer');
  } else {
    tags.push('New Agent');
  }

  // Add tags based on stress level
  if (leadData.businessStressLevel === 'high' || leadData.businessStressLevel === 'severe') {
    tags.push('High Stress');
  }

  // Add tags based on biggest challenge
  if (leadData.biggestChallenge) {
    const challengeTag = leadData.biggestChallenge
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') + ' Challenge';
    tags.push(challengeTag);
  }

  // Add tags based on start timeline
  if (leadData.startTimeline === 'immediately') {
    tags.push('Ready Now');
  } else if (leadData.startTimeline === 'within_month') {
    tags.push('Hot Lead');
  } else if (leadData.startTimeline === 'within_quarter') {
    tags.push('Warm Lead');
  }

  // Add tag based on target income
  if (leadData.targetIncome > 500000) {
    tags.push('High Income Goal');
  } else if (leadData.targetIncome > 200000) {
    tags.push('Medium Income Goal');
  }

  return tags;
}

function calculateLeadScore(leadData: LeadData): number {
  let score = 0;
  
  // Score based on sphere size (max 25 points)
  if (leadData.sphereSize > 500) score += 25;
  else if (leadData.sphereSize > 200) score += 20;
  else if (leadData.sphereSize > 100) score += 15;
  else if (leadData.sphereSize > 50) score += 10;
  else if (leadData.sphereSize > 0) score += 5;

  // Score based on transactions (max 25 points)
  if (leadData.annualTransactions > 20) score += 25;
  else if (leadData.annualTransactions > 10) score += 20;
  else if (leadData.annualTransactions > 5) score += 15;
  else if (leadData.annualTransactions > 2) score += 10;
  else if (leadData.annualTransactions > 0) score += 5;

  // Score based on target income (max 20 points)
  if (leadData.targetIncome > 500000) score += 20;
  else if (leadData.targetIncome > 300000) score += 15;
  else if (leadData.targetIncome > 150000) score += 10;
  else if (leadData.targetIncome > 100000) score += 5;

  // Score based on start timeline (max 15 points)
  if (leadData.startTimeline === 'immediately') score += 15;
  else if (leadData.startTimeline === 'within_month') score += 12;
  else if (leadData.startTimeline === 'within_quarter') score += 8;
  else if (leadData.startTimeline === 'within_year') score += 5;

  // Score based on stress level (max 10 points - higher stress = more likely to need help)
  if (leadData.businessStressLevel === 'severe') score += 10;
  else if (leadData.businessStressLevel === 'high') score += 8;
  else if (leadData.businessStressLevel === 'moderate') score += 5;
  else if (leadData.businessStressLevel === 'low') score += 2;

  // Score based on contact frequency (max 5 points - less frequent = more opportunity)
  if (leadData.sphereContactFrequency === 'rarely') score += 5;
  else if (leadData.sphereContactFrequency === 'annually') score += 4;
  else if (leadData.sphereContactFrequency === 'biannually') score += 3;
  else if (leadData.sphereContactFrequency === 'quarterly') score += 2;
  else if (leadData.sphereContactFrequency === 'monthly') score += 1;

  return Math.min(score, 100); // Cap at 100
}

serve(handler);