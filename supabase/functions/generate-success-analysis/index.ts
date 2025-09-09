import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import { Resend } from "npm:resend@2.0.0";
import jsPDF from "https://esm.sh/jspdf@2.5.1";

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
    // Create PDF using jsPDF (free and open-source)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Extract text content from HTML
    const textContent = htmlContent
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();

    // Split content into lines and add to PDF
    const lines = textContent.split('\n').filter(line => line.trim());
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let y = margin;
    
    doc.setFontSize(16);
    doc.text('Real Estate Success Analysis', margin, y);
    y += 15;
    
    doc.setFontSize(12);
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      
      // Check if we need a new page
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      
      // Split long lines
      const splitLines = doc.splitTextToSize(trimmedLine, 170);
      for (const splitLine of splitLines) {
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(splitLine, margin, y);
        y += 7;
      }
      y += 3; // Extra spacing between sections
    }

    // Convert to Uint8Array
    const pdfOutput = doc.output('arraybuffer');
    return new Uint8Array(pdfOutput);
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
      from: 'Real Estate On Purpose <noreply@market.realestateonpurpose.com>',
      to: [data.email],
      subject: `${data.firstName}, Your Real Estate Success Analysis is Ready! 📊`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Real Estate Success Analysis</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1a202c;
              background-color: #f7fafc;
            }
            
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            
            .header {
              background: linear-gradient(135deg, #00bcd4 0%, #006064 100%);
              padding: 40px 30px;
              text-align: center;
              color: white;
            }
            
            .logo {
              max-height: 60px;
              width: auto;
              margin-bottom: 20px;
            }
            
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 8px;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .header p {
              font-size: 16px;
              opacity: 0.95;
              font-weight: 400;
            }
            
            .content {
              padding: 40px 30px;
            }
            
            .greeting {
              font-size: 18px;
              font-weight: 600;
              color: #006064;
              margin-bottom: 20px;
            }
            
            .intro-text {
              font-size: 16px;
              color: #4a5568;
              margin-bottom: 30px;
              line-height: 1.7;
            }
            
            .insights-card {
              background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
              border-left: 5px solid #00bcd4;
              padding: 25px;
              border-radius: 8px;
              margin: 30px 0;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
            
            .insights-card h3 {
              color: #006064;
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 15px;
              display: flex;
              align-items: center;
            }
            
            .insights-card h3::before {
              content: "📈";
              margin-right: 8px;
              font-size: 24px;
            }
            
            .insight-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .insight-item:last-child {
              border-bottom: none;
            }
            
            .insight-label {
              font-weight: 500;
              color: #2d3748;
              flex: 1;
            }
            
            .insight-value {
              font-weight: 600;
              color: #00bcd4;
              font-size: 16px;
            }
            
            .cta-section {
              text-align: center;
              margin: 40px 0;
              padding: 30px;
              background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
              border-radius: 12px;
              border: 2px solid #feb2b2;
            }
            
            .cta-text {
              font-size: 18px;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 20px;
            }
            
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #00bcd4 0%, #006064 100%);
              color: white;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
              transition: all 0.3s ease;
            }
            
            .secondary-cta {
              display: inline-block;
              background: transparent;
              color: #006064;
              padding: 16px 32px;
              text-decoration: none;
              border: 2px solid #00bcd4;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              margin-left: 15px;
              transition: all 0.3s ease;
            }
            
            .pdf-preview {
              background: #f8fafc;
              border: 2px dashed #00bcd4;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 25px 0;
            }
            
            .pdf-icon {
              font-size: 48px;
              margin-bottom: 10px;
            }
            
            .signature {
              margin-top: 40px;
              padding-top: 30px;
              border-top: 2px solid #e2e8f0;
            }
            
            .signature-name {
              font-weight: 600;
              color: #006064;
              font-size: 18px;
              margin-bottom: 5px;
            }
            
            .signature-title {
              color: #4a5568;
              font-style: italic;
              margin-bottom: 15px;
            }
            
            .footer {
              background: #1a202c;
              color: white;
              padding: 30px;
              text-align: center;
            }
            
            .footer-content {
              margin-bottom: 20px;
            }
            
            .social-links {
              margin: 20px 0;
            }
            
            .social-links a {
              color: #00bcd4;
              text-decoration: none;
              margin: 0 15px;
              font-weight: 500;
            }
            
            .footer-small {
              font-size: 14px;
              color: #a0aec0;
              line-height: 1.5;
            }
            
            @media (max-width: 600px) {
              .content {
                padding: 30px 20px;
              }
              
              .header {
                padding: 30px 20px;
              }
              
              .cta-button, .secondary-cta {
                display: block;
                margin: 10px 0;
              }
              
              .insight-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header with Branding -->
            <div class="header">
              <h1>Your Success Analysis is Ready!</h1>
              <p>Personalized insights to accelerate your real estate career</p>
            </div>
            
            <!-- Main Content -->
            <div class="content">
              <div class="greeting">Hi ${data.firstName}! 👋</div>
              
              <div class="intro-text">
                Thank you for taking the time to share your real estate journey with us. We've carefully analyzed your current situation and created a comprehensive success analysis report tailored specifically for your goals and market.
              </div>
              
              <!-- Key Insights Card -->
              <div class="insights-card">
                <h3>Your Key Metrics at a Glance</h3>
                <div class="insight-item">
                  <span class="insight-label">Current Annual Earnings</span>
                  <span class="insight-value">$${data.currentAnnualEarnings?.toLocaleString() || 'Not specified'}</span>
                </div>
                <div class="insight-item">
                  <span class="insight-label">Monthly Transactions</span>
                  <span class="insight-value">${data.monthlyTransactions || 'Not specified'}</span>
                </div>
                <div class="insight-item">
                  <span class="insight-label">Years of Experience</span>
                  <span class="insight-value">${data.yearsInRealEstate || 'Not specified'} years</span>
                </div>
                <div class="insight-item">
                  <span class="insight-label">Primary Market</span>
                  <span class="insight-value">${data.primaryMarket || 'Not specified'}</span>
                </div>
              </div>
              
              <!-- PDF Preview -->
              <div class="pdf-preview">
                <div class="pdf-icon">📄</div>
                <strong>Your Complete Success Analysis Report</strong>
                <p style="margin-top: 8px; color: #4a5568;">Attached as PDF with detailed recommendations and action steps</p>
              </div>
              
              <!-- Call to Action -->
              <div class="cta-section">
                <div class="cta-text">Ready to take your real estate business to the next level?</div>
                <a href="mailto:support@realestateonpurpose.com?subject=Success Analysis Follow-up - ${data.firstName}" class="cta-button">
                  📅 Schedule Free Strategy Call
                </a>
                <a href="https://realestateonpurpose.com" class="secondary-cta">
                  🌐 Visit Our Website
                </a>
              </div>
              
              <div class="intro-text">
                Your attached report contains personalized strategies, market opportunities, and actionable steps designed specifically for your current situation and goals. We're excited to help you build a purpose-driven real estate career!
              </div>
              
              <!-- Signature -->
              <div class="signature">
                <div class="signature-name">The Real Estate On Purpose Team</div>
                <div class="signature-title">Building Purpose-Driven Real Estate Careers</div>
                <div style="color: #4a5568;">
                  📧 support@realestateonpurpose.com<br>
                  🌐 realestateonpurpose.com
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-content">
                <strong>Real Estate On Purpose</strong><br>
                Empowering agents to build meaningful, profitable careers
              </div>
              
              <div class="social-links">
                <a href="#">LinkedIn</a>
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">YouTube</a>
              </div>
              
              <div class="footer-small">
                This email was sent because you requested a success analysis.<br>
                If you have any questions, simply reply to this email.<br>
                © 2024 Real Estate On Purpose. All rights reserved.
              </div>
            </div>
          </div>
        </body>
        </html>
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