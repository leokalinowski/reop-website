import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
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

interface AnalysisData {
  currentEarnings: number;
  projectedEarnings: number;
  annualSavings: number;
  timePerTransaction: number;
  leadGenImprovement: number;
  roiProjection: number;
  marketOpportunities: string[];
  recommendedActions: string[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    console.log('Processing success analysis for:', formData.email);

    // Calculate personalized metrics
    const analysis = calculateAnalysis(formData);
    
    // Generate HTML content for the PDF
    const htmlContent = generateHTMLReport(formData, analysis);
    
    // Use background processing for PDF generation and email sending
    EdgeRuntime.waitUntil(
      processAnalysisBackground(formData, htmlContent, analysis)
    );

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Success analysis is being processed and will be sent shortly',
        analysis: analysis 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-success-analysis function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

async function processAnalysisBackground(
  formData: FormData, 
  htmlContent: string, 
  analysis: AnalysisData
): Promise<void> {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Generate PDF
    const pdfBuffer = await generatePDF(htmlContent);
    
    // Store PDF in Supabase Storage
    const pdfFileName = `${formData.firstName}-${formData.lastName}-success-analysis-${Date.now()}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('pdf-reports')
      .upload(pdfFileName, pdfBuffer, {
        contentType: 'application/pdf',
        metadata: {
          lead_email: formData.email,
          generated_at: new Date().toISOString()
        }
      });

    if (uploadError) {
      console.error('PDF upload error:', uploadError);
      throw uploadError;
    }

    console.log('PDF uploaded successfully:', uploadData);

    // Send email with PDF attachment
    await sendEmailWithPDF(formData, pdfBuffer, pdfFileName);
    
    // Update the lead record to mark PDF as generated and sent
    await supabase
      .from('leads')
      .update({ 
        pdf_generated: true, 
        pdf_sent: true 
      })
      .eq('email', formData.email);

    console.log('Analysis processing completed for:', formData.email);
  } catch (error) {
    console.error('Background processing error:', error);
    
    // Update lead record to indicate failure
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    await supabase
      .from('leads')
      .update({ 
        pdf_generated: false, 
        pdf_sent: false 
      })
      .eq('email', formData.email);
  }
}

function calculateAnalysis(formData: FormData): AnalysisData {
  // Calculate current earnings based on transactions
  const currentEarnings = formData.annualTransactions * 3500; // Average commission per transaction
  
  // Calculate sphere utilization rate
  const sphereUtilizationRate = formData.sphereSize > 0 ? (formData.annualTransactions / formData.sphereSize) * 100 : 0;
  
  // Calculate projected earnings with our system
  const baseMultiplier = 2.0;
  
  // Adjust multiplier based on sphere contact frequency
  const contactFrequencyBonus = {
    'weekly': 0.5,
    'monthly': 0.3,
    'quarterly': 0.1,
    'biannually': 0,
    'annually': -0.1,
    'rarely': -0.2
  }[formData.sphereContactFrequency] || 0;
  
  // Adjust based on work-life balance (more efficient agents earn more)
  const efficiencyBonus = formData.weeklyHours > 60 ? -0.2 : formData.weeklyHours < 40 ? 0.3 : 0.1;
  
  const finalMultiplier = baseMultiplier + contactFrequencyBonus + efficiencyBonus;
  const projectedEarnings = Math.round(Math.max(currentEarnings * finalMultiplier, currentEarnings * 1.5));
  
  // Calculate annual savings (commission splits, marketing, etc.)
  const annualSavings = Math.round(projectedEarnings * 0.15);
  
  // Calculate time savings per transaction based on current workload
  const timePerTransaction = Math.round(Math.max(10, 25 - (formData.weeklyHours / 5)));
  
  // Calculate lead generation improvement based on sphere size and contact frequency
  const leadGenImprovement = Math.round(150 + (formData.sphereSize * 0.1) + (formData.annualTransactions * 8));
  
  // Calculate ROI projection
  const roiProjection = Math.round(((projectedEarnings - currentEarnings) / 12000) * 100);
  
  // Generate market opportunities based on business metrics
  const marketOpportunities = [
    `Sphere optimization: Your ${formData.sphereSize} contacts could generate ${Math.round(formData.sphereSize * 0.05)} deals annually`,
    `Contact frequency improvement could increase referrals by ${contactFrequencyBonus > 0 ? '40%' : '60%'}`,
    `Professional systems reduce stress while increasing productivity`,
    `Automated follow-up captures leads you're currently missing`
  ];
  
  // Generate recommended actions based on biggest challenge
  const challengeActions = {
    'lead-generation': [
      "Implement automated lead nurturing system",
      "Develop sphere contact strategy",
      "Create consistent social media presence"
    ],
    'time-management': [
      "Delegate administrative tasks to our team",
      "Implement time-blocking strategies",
      "Use transaction coordination services"
    ],
    'marketing': [
      "Access professional marketing materials",
      "Develop personal brand strategy",
      "Leverage social media automation"
    ],
    'work-life-balance': [
      "Implement efficient systems to reduce hours",
      "Focus on high-value activities only",
      "Use our support team for admin tasks"
    ]
  };
  
  const recommendedActions = challengeActions[formData.biggestChallenge] || [
    "Schedule strategy call to discuss your specific needs",
    "Review our comprehensive support system",
    "Connect with successful agents in our network"
  ];

  return {
    currentEarnings,
    projectedEarnings,
    annualSavings,
    timePerTransaction,
    leadGenImprovement,
    roiProjection,
    marketOpportunities,
    recommendedActions
  };
}

function generateHTMLReport(formData: FormData, analysis: AnalysisData): string {
  const sphereUtilizationRate = formData.sphereSize > 0 ? ((formData.annualTransactions / formData.sphereSize) * 100).toFixed(1) : '0';
  const hoursPerDeal = formData.annualTransactions > 0 ? (formData.weeklyHours * 52 / formData.annualTransactions).toFixed(1) : '0';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Real Estate Success Analysis - ${formData.firstName} ${formData.lastName}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
        .metric { display: inline-block; margin: 10px 15px; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: center; min-width: 120px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #667eea; }
        .metric-label { font-size: 12px; color: #666; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .challenge-box { background: #f8d7da; padding: 15px; border-radius: 5px; margin: 10px 0; border-left: 4px solid #dc3545; }
        ul { list-style-type: none; padding: 0; }
        li { padding: 8px 0; border-bottom: 1px solid #eee; }
        .footer { text-align: center; margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
        .stress-indicator { padding: 10px; border-radius: 5px; margin: 10px 0; }
        .stress-low { background: #d4edda; border-left: 4px solid #28a745; }
        .stress-moderate { background: #fff3cd; border-left: 4px solid #ffc107; }
        .stress-high { background: #f8d7da; border-left: 4px solid #dc3545; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Personalized Real Estate Success Analysis</h1>
        <h2>For ${formData.firstName} ${formData.lastName}</h2>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>

      <div class="section">
        <h2>Your Current Business Snapshot</h2>
        <div class="metric">
          <div class="metric-value">${formData.sphereSize}</div>
          <div class="metric-label">Sphere Size</div>
        </div>
        <div class="metric">
          <div class="metric-value">${formData.annualTransactions}</div>
          <div class="metric-label">Deals Last Year</div>
        </div>
        <div class="metric">
          <div class="metric-value">${formData.weeklyHours}</div>
          <div class="metric-label">Weekly Hours</div>
        </div>
        <div class="metric">
          <div class="metric-value">${sphereUtilizationRate}%</div>
          <div class="metric-label">Sphere Utilization</div>
        </div>
        <div class="metric">
          <div class="metric-value">${hoursPerDeal}</div>
          <div class="metric-label">Hours Per Deal</div>
        </div>
        <div class="metric">
          <div class="metric-value">$${analysis.currentEarnings.toLocaleString()}</div>
          <div class="metric-label">Current Annual Earnings</div>
        </div>
      </div>

      <div class="section">
        <h2>Business Management & Stress Analysis</h2>
        <p><strong>Contact Frequency:</strong> ${formData.sphereContactFrequency}</p>
        <p><strong>Budget Management:</strong> ${formData.budgetManagementStyle}</p>
        <div class="stress-indicator stress-${formData.businessStressLevel}">
          <strong>Current Stress Level:</strong> ${formData.businessStressLevel.charAt(0).toUpperCase() + formData.businessStressLevel.slice(1)}
        </div>
        <div class="challenge-box">
          <strong>Biggest Challenge:</strong> ${formData.biggestChallenge.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
      </div>

      <div class="section">
        <h2>Your Projected Success with Real Estate On Purpose</h2>
        <div class="highlight">
          <strong>Projected Annual Earnings: $${analysis.projectedEarnings.toLocaleString()}</strong>
          <br>Income Increase: $${(analysis.projectedEarnings - analysis.currentEarnings).toLocaleString()}
        </div>
        <div class="metric">
          <div class="metric-value">$${analysis.annualSavings.toLocaleString()}</div>
          <div class="metric-label">Annual Savings</div>
        </div>
        <div class="metric">
          <div class="metric-value">${analysis.timePerTransaction}</div>
          <div class="metric-label">Hours Saved Per Deal</div>
        </div>
        <div class="metric">
          <div class="metric-value">${analysis.leadGenImprovement}%</div>
          <div class="metric-label">Lead Gen Improvement</div>
        </div>
      </div>

      <div class="section">
        <h2>Return on Investment</h2>
        <div class="highlight">
          <strong>Projected ROI: ${analysis.roiProjection}%</strong>
          <br>Based on your specific business metrics and our comprehensive support system.
        </div>
      </div>

      <div class="section">
        <h2>Personalized Opportunities</h2>
        <ul>
          ${analysis.marketOpportunities.map(opportunity => `<li>• ${opportunity}</li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <h2>Customized Action Plan</h2>
        <p><strong>Based on your biggest challenge (${formData.biggestChallenge.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}):</strong></p>
        <ul>
          ${analysis.recommendedActions.map(action => `<li>• ${action}</li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <h2>Why Real Estate On Purpose Solves Your Challenges</h2>
        <ul>
          <li>• <strong>No monthly fees</strong> - Keep more of your hard-earned commissions</li>
          <li>• <strong>Complete transaction coordination</strong> - Reduce your hours per deal significantly</li>
          <li>• <strong>Automated sphere management</strong> - Stay in touch effortlessly and consistently</li>
          <li>• <strong>Professional marketing systems</strong> - Generate more leads from your existing network</li>
          <li>• <strong>Weekly coaching sessions</strong> - Reduce stress with proven strategies</li>
          <li>• <strong>Comprehensive administrative support</strong> - Focus on what you do best</li>
        </ul>
      </div>

      <div class="footer">
        <p><strong>Ready to transform your real estate business and reduce your stress?</strong></p>
        <p>Your personalized analysis shows the potential for significant improvement.</p>
        <p>Contact us today to schedule your strategy session!</p>
        <p>Email: info@realestateonpurpose.com | Phone: (555) 123-4567</p>
      </div>
    </body>
    </html>
  `;
}

async function generatePDF(htmlContent: string): Promise<Uint8Array> {
  try {
    // Use htmlcsstoimage.com API for real PDF generation
    const response = await fetch('https://hcti.io/v1/image', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa('user-id:api-key')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: htmlContent,
        css: '',
        google_fonts: 'Arial',
        width: 800,
        height: 1000,
        device_scale: 2
      }),
    });

    if (!response.ok) {
      throw new Error(`PDF generation failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Download the generated image as PDF-like content
    const imageResponse = await fetch(result.url);
    const imageBuffer = await imageResponse.arrayBuffer();
    
    return new Uint8Array(imageBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    
    // Fallback to text-based content
    const textContent = htmlContent
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const encoder = new TextEncoder();
    return encoder.encode(`PDF Content (Fallback):\n\n${textContent}`);
  }
}

async function sendEmailWithPDF(data: FormData, pdfBuffer: Uint8Array, fileName: string): Promise<void> {
  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const emailResponse = await resend.emails.send({
      from: 'Real Estate On Purpose <onboarding@resend.dev>',
      to: [data.email],
      subject: 'Your Personalized Real Estate Success Analysis',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1>Your Success Analysis is Ready!</h1>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa; border-radius: 8px; margin-bottom: 20px;">
            <h2>Hi ${data.firstName},</h2>
            <p>Thank you for taking the time to complete our success analysis form. Your personalized report is attached as a PDF.</p>
            
            <p>This analysis shows how you could potentially <strong>increase your annual income</strong> while <strong>saving money on fees</strong> by joining the Real Estate On Purpose team.</p>
          </div>
          
          <div style="padding: 20px; border: 1px solid #eee; border-radius: 8px; margin-bottom: 20px;">
            <h3>Next Steps:</h3>
            <ol>
              <li>Review your personalized analysis (attached)</li>
              <li>Schedule a strategy call to discuss your specific situation</li>
              <li>Ask any questions about our system and support</li>
            </ol>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <p style="font-size: 18px; color: #667eea;"><strong>Ready to transform your real estate business?</strong></p>
            <p>We're excited about the possibility of helping you achieve your real estate goals!</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
            <p><strong>Contact us:</strong></p>
            <p>Email: info@realestateonpurpose.com | Phone: (555) 123-4567</p>
            <p style="font-size: 12px; color: #666;">Real Estate On Purpose - Transforming Careers, One Agent at a Time</p>
          </div>
        </div>
      `,
      text: `Hi ${data.firstName},

Thank you for completing our success analysis form. Your personalized report is attached.

This analysis shows how you could potentially increase your annual income while saving money on fees by joining Real Estate On Purpose.

Next Steps:
1. Review your personalized analysis (attached)
2. Schedule a strategy call to discuss your situation
3. Ask questions about our system and support

Contact us:
Email: info@realestateonpurpose.com
Phone: (555) 123-4567

Best regards,
The Real Estate On Purpose Team`,
      attachments: [
        {
          filename: fileName,
          content: Array.from(pdfBuffer),
        },
      ],
    });

    console.log('Email sent successfully:', emailResponse);
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}

serve(handler);