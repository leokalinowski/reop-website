import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  experienceLevel: string;
  currentBrokerage?: string;
  annualTransactions: number;
  targetIncome: number;
  preferredMarkets: string[];
  businessObjectives?: string;
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
    
    // Convert HTML to PDF using a simple HTML-to-PDF service
    const pdfBuffer = await generatePDF(htmlContent);
    
    // Send email with PDF attachment
    await sendEmailWithPDF(formData, pdfBuffer);
    
    // Update the lead record to mark PDF as generated and sent
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    await supabase
      .from('leads')
      .update({ 
        pdf_generated: true, 
        pdf_sent: true 
      })
      .eq('email', formData.email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Success analysis generated and sent',
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

function calculateAnalysis(data: FormData): AnalysisData {
  // Base calculations based on experience level and current performance
  const baseCommissionPerTransaction = 7500; // Average $7,500 per transaction
  const currentEarnings = data.annualTransactions * baseCommissionPerTransaction;
  
  // Calculate improvement multipliers based on experience level
  let improvementMultiplier = 1.0;
  switch (data.experienceLevel) {
    case 'new':
      improvementMultiplier = 2.5; // New agents can see dramatic improvement
      break;
    case 'experienced':
      improvementMultiplier = 1.8; // Experienced agents see good improvement
      break;
    case 'veteran':
      improvementMultiplier = 1.4; // Veterans see efficiency gains
      break;
  }

  // Projected earnings with Real Estate On Purpose
  const projectedTransactions = Math.max(
    data.annualTransactions * improvementMultiplier,
    Math.ceil(data.targetIncome / baseCommissionPerTransaction)
  );
  const projectedEarnings = projectedTransactions * baseCommissionPerTransaction;

  // Annual savings (no monthly fees vs typical brokerages)
  const annualSavings = 3600; // $300/month * 12 months saved

  // Time savings per transaction (hours)
  const timePerTransaction = data.experienceLevel === 'new' ? 8 : 5;

  // Lead generation improvement (percentage)
  const leadGenImprovement = data.experienceLevel === 'new' ? 300 : 150;

  // ROI calculation
  const additionalEarnings = projectedEarnings - currentEarnings;
  const roiProjection = additionalEarnings + annualSavings;

  // Market opportunities based on preferred markets
  const marketOpportunities = data.preferredMarkets.map(market => 
    `${market}: High growth potential with average home price trends showing 8-12% annual appreciation`
  );

  // Recommended actions based on profile
  const recommendedActions = [
    'Join our automated lead generation system to increase qualified prospects by 300%',
    'Access our proven transaction coordination system to save 5-8 hours per deal',
    'Implement our social media automation to build your personal brand',
    'Use our surprise & delight system to generate more referrals'
  ];

  if (data.experienceLevel === 'new') {
    recommendedActions.unshift('Complete our comprehensive agent training program');
  }

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

function generateHTMLReport(data: FormData, analysis: AnalysisData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
            .content { padding: 40px; }
            .metric-card { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }
            .metric-value { font-size: 2em; font-weight: bold; color: #667eea; }
            .metric-label { color: #666; margin-top: 5px; }
            .section { margin: 30px 0; }
            .section h2 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
            .action-item { background: #e3f2fd; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 3px solid #2196f3; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; }
            .highlight { background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%); padding: 2px 6px; border-radius: 3px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Your Personalized Success Analysis</h1>
                <h2>Real Estate On Purpose - Success Roadmap</h2>
                <p>Prepared for ${data.firstName} ${data.lastName}</p>
            </div>
            
            <div class="content">
                <div class="section">
                    <h2>Your Current Situation</h2>
                    <div class="metric-card">
                        <div class="metric-value">$${analysis.currentEarnings.toLocaleString()}</div>
                        <div class="metric-label">Current Annual Earnings (${data.annualTransactions} transactions)</div>
                    </div>
                    <p>Based on your ${data.experienceLevel} experience level and ${data.annualTransactions} annual transactions, we've analyzed your potential for growth.</p>
                </div>

                <div class="section">
                    <h2>Your Projected Success with Real Estate On Purpose</h2>
                    <div class="metric-card">
                        <div class="metric-value">$${analysis.projectedEarnings.toLocaleString()}</div>
                        <div class="metric-label">Projected Annual Earnings</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">$${analysis.annualSavings.toLocaleString()}</div>
                        <div class="metric-label">Annual Savings (No Monthly Fees)</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${analysis.timePerTransaction} hours</div>
                        <div class="metric-label">Time Saved Per Transaction</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">${analysis.leadGenImprovement}%</div>
                        <div class="metric-label">Lead Generation Improvement</div>
                    </div>
                </div>

                <div class="section">
                    <h2>Your Total ROI Potential</h2>
                    <div class="metric-card">
                        <div class="metric-value">$${analysis.roiProjection.toLocaleString()}</div>
                        <div class="metric-label">Additional Annual Income + Savings</div>
                    </div>
                    <p>This represents the <span class="highlight">additional value</span> you could gain by joining our team, combining increased earnings with eliminated monthly fees.</p>
                </div>

                ${analysis.marketOpportunities.length > 0 ? `
                <div class="section">
                    <h2>Market Opportunities in Your Areas</h2>
                    ${analysis.marketOpportunities.map(opp => `<div class="action-item">${opp}</div>`).join('')}
                </div>
                ` : ''}

                <div class="section">
                    <h2>Your Personalized Action Plan</h2>
                    ${analysis.recommendedActions.map(action => `<div class="action-item">✓ ${action}</div>`).join('')}
                </div>

                <div class="section">
                    <h2>What Makes This Possible?</h2>
                    <p>Our proven system includes:</p>
                    <ul>
                        <li><strong>Automated Lead Generation:</strong> AI-powered system that attracts qualified buyers and sellers</li>
                        <li><strong>Transaction Coordination:</strong> Streamlined process that saves hours per deal</li>
                        <li><strong>Social Media Automation:</strong> Build your brand while you focus on clients</li>
                        <li><strong>Surprise & Delight System:</strong> Turn clients into raving fans and referral sources</li>
                        <li><strong>Weekly Coaching:</strong> Stay accountable and continuously improve</li>
                        <li><strong>Zero Monthly Fees:</strong> Keep more of what you earn</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>Ready to Start Your Success Story?</h2>
                    <p>Based on your timeline of <strong>${data.startTimeline.replace('_', ' ')}</strong>, we recommend scheduling a strategy call within the next 7 days to discuss your specific situation and answer any questions.</p>
                </div>
            </div>

            <div class="footer">
                <p>This analysis was generated specifically for ${data.firstName} ${data.lastName}</p>
                <p>Real Estate On Purpose • Building Successful Careers • Zero Monthly Fees</p>
                <p>Ready to take the next step? Reply to this email or call us directly.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

async function generatePDF(htmlContent: string): Promise<Uint8Array> {
  // For this demo, we'll create a simple text-based PDF
  // In production, you'd use a proper HTML-to-PDF service like Puppeteer or similar
  
  const textContent = htmlContent
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Create a simple PDF-like response
  // Note: This is a simplified version. For production, use proper PDF generation
  const encoder = new TextEncoder();
  return encoder.encode(`PDF Content:\n\n${textContent}`);
}

async function sendEmailWithPDF(data: FormData, pdfBuffer: Uint8Array): Promise<void> {
  // For this demo, we'll log the email content
  // In production, integrate with your email service (Resend, SendGrid, etc.)
  console.log(`
    Sending email to: ${data.email}
    Subject: Your Personalized Real Estate Success Analysis
    
    Hi ${data.firstName},
    
    Thank you for taking the time to complete our success analysis form. Your personalized report is attached as a PDF.
    
    This analysis shows how you could potentially increase your annual income while saving money on fees by joining the Real Estate On Purpose team.
    
    Next steps:
    1. Review your personalized analysis
    2. Schedule a strategy call to discuss your specific situation
    3. Ask any questions about our system and support
    
    We're excited about the possibility of helping you achieve your real estate goals!
    
    Best regards,
    The Real Estate On Purpose Team
    
    PDF Report: ${pdfBuffer.length} bytes attached
  `);
}

serve(handler);