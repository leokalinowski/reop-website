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
  timePerTransaction: number;
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
    const pdfBuffer = await generatePDF(htmlContent, formData);
    
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
  // Calculate current earnings based on transactions (using $3,500 average commission)
  const averageCommission = 3500;
  const currentEarnings = formData.annualTransactions * averageCommission;
  
  // Calculate sphere utilization rate
  const sphereUtilizationRate = formData.sphereSize > 0 ? (formData.annualTransactions / formData.sphereSize) * 100 : 0;
  
  // Calculate projected earnings: sphere size divided by 6 (industry standard) times average commission
  const projectedEarnings = Math.round((formData.sphereSize / 6) * averageCommission);
  
  // Calculate time savings per transaction (baseline 25 hours minus efficiency factors)
  const timePerTransaction = Math.round(Math.max(10, 25 - (formData.weeklyHours / 5)));
  
  // Generate market opportunities based on business metrics
  const potentialDeals = Math.round(formData.sphereSize / 6);
  const improvementPercentage = formData.annualTransactions > 0 ? 
    Math.round(((potentialDeals - formData.annualTransactions) / formData.annualTransactions) * 100) : 
    100;
  
  const marketOpportunities = [
    `Sphere optimization: Your ${formData.sphereSize} contacts could generate ${potentialDeals} deals annually vs your current ${formData.annualTransactions} deals`,
    `Contact frequency improvement could increase referrals by ${improvementPercentage}%`,
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
    timePerTransaction,
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
        .header { background: linear-gradient(135deg, #00a2ad 0%, #005d6c 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
        .metric { display: inline-block; margin: 10px 15px; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: center; min-width: 120px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #00a2ad; }
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
        <h2>Current Business Analysis</h2>
        <p><strong>Sphere Contact Frequency:</strong> You contact your database ${formData.sphereContactFrequency}</p>
        <p><strong>Budget & P&L Management:</strong> ${formData.budgetManagementStyle.charAt(0).toUpperCase() + formData.budgetManagementStyle.slice(1)} tracking and management</p>
        <p><strong>Target Annual Income:</strong> $${formData.targetIncome.toLocaleString()}</p>
        <p><strong>Timeline to Start:</strong> ${formData.startTimeline.charAt(0).toUpperCase() + formData.startTimeline.slice(1)}</p>
        <div class="stress-indicator stress-${formData.businessStressLevel}">
          <strong>Current Business Stress Level:</strong> ${formData.businessStressLevel.charAt(0).toUpperCase() + formData.businessStressLevel.slice(1)}
        </div>
        <div class="challenge-box">
          <strong>Your Biggest Challenge Right Now:</strong> ${formData.biggestChallenge.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
      </div>

      <div class="section">
        <h2>Your Projected Success with Real Estate On Purpose</h2>
        <div class="highlight">
          <strong>Projected Annual Earnings: $${analysis.projectedEarnings.toLocaleString()}</strong>*
          <br>Income Increase: $${(analysis.projectedEarnings - analysis.currentEarnings).toLocaleString()}
          <br><small>*Based on industry standard: 1 deal per 6 sphere contacts × $3,500 average commission</small>
        </div>
        <div class="metric">
          <div class="metric-value">${analysis.timePerTransaction}</div>
          <div class="metric-label">Hours Saved Per Deal<br><small>Calculated from baseline 25 hours minus efficiency factors</small></div>
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
        <p><strong>Personalized recommendations based on your challenge with ${formData.biggestChallenge.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:</strong></p>
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
        <p style="margin: 20px 0;">
          <a href="https://realestateonpurpose.com/appointmentwithreop" 
             style="background: #00a2ad; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Schedule Your Strategy Session with Pam
          </a>
        </p>
        <p><em>Book your personalized consultation to discuss your path to success</em></p>
      </div>
    </body>
    </html>
  `;
}

async function generatePDF(htmlContent: string, formData: FormData): Promise<Uint8Array> {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // Define colors (Real Estate on Purpose brand colors)
    const primaryColor = [0, 162, 173]; // #00a2ad (teal)
    const darkColor = [0, 93, 108]; // #005d6c (dark teal)
    const textColor = [45, 55, 72]; // #2d3748
    const lightGray = [248, 250, 252]; // #f8fafc

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace = 15) => {
      if (y + requiredSpace > pageHeight - margin) {
        doc.addPage();
        y = margin;
        return true;
      }
      return false;
    };

    // Header with text branding only (no logo to avoid display issues)
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('REAL ESTATE ON PURPOSE', margin, 20);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Personalized Success Analysis', margin, 30);
    
    doc.setFontSize(12);
    doc.text(`For ${formData.firstName} ${formData.lastName}`, margin, 40);
    
    y = 65;

    // Use the actual form data passed to this function
    const analysis = calculateAnalysis(formData);

    // Section 1: Executive Summary
    checkPageBreak(25);
    doc.setFillColor(...lightGray);
    doc.rect(margin, y - 5, contentWidth, 20, 'F');
    
    doc.setTextColor(...darkColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', margin + 5, y + 8);
    y += 25;

    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const summaryText = `This analysis reveals significant opportunities to optimize your real estate business. Through strategic improvements in sphere management, lead generation, and operational efficiency, you can potentially increase your annual earnings while reducing stress and working hours.`;
    const summaryLines = doc.splitTextToSize(summaryText, contentWidth - 10);
    doc.text(summaryLines, margin + 5, y);
    y += summaryLines.length * 5 + 15;

    // Section 2: Current Business Metrics
    checkPageBreak(40);
    doc.setFillColor(...primaryColor);
    doc.rect(margin, y - 5, contentWidth, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Current Business Analysis', margin + 5, y + 6);
    y += 20;

    // Metrics in a table format
    const sphereUtilizationRate = formData.sphereSize > 0 ? ((formData.annualTransactions / formData.sphereSize) * 100).toFixed(1) : '0';
    const hoursPerDeal = formData.annualTransactions > 0 ? (formData.weeklyHours * 52 / formData.annualTransactions).toFixed(1) : '0';
    
    const metrics = [
      ['Sphere Size', `${formData.sphereSize} contacts`],
      ['Annual Transactions', `${formData.annualTransactions} deals`],
      ['Weekly Hours', `${formData.weeklyHours} hours`],
      ['Sphere Utilization', `${sphereUtilizationRate}%`],
      ['Current Earnings', `$${analysis.currentEarnings.toLocaleString()}`],
      ['Hours per Deal', `${hoursPerDeal} hours`],
      ['Contact Frequency', formData.sphereContactFrequency],
      ['Budget Management', formData.budgetManagementStyle],
      ['Stress Level', formData.businessStressLevel],
      ['Biggest Challenge', formData.biggestChallenge.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')],
      ['Target Income', `$${formData.targetIncome.toLocaleString()}`]
    ];

    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    metrics.forEach(([label, value], index) => {
      checkPageBreak(8);
      const rowY = y + (index * 8);
      
      // Alternating row backgrounds
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, rowY - 2, contentWidth, 7, 'F');
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin + 5, rowY + 3);
      doc.setFont('helvetica', 'normal');
      doc.text(value, margin + 80, rowY + 3);
    });
    y += metrics.length * 8 + 15;

    // Section 3: Projected Success Metrics
    checkPageBreak(40);
    doc.setFillColor(...darkColor);
    doc.rect(margin, y - 5, contentWidth, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Projected Success with Real Estate on Purpose', margin + 5, y + 6);
    y += 20;

    // Success metrics with footnote (removed annual savings)
    const successMetrics = [
      ['Projected Annual Earnings*', `$${analysis.projectedEarnings.toLocaleString()}`, `+$${(analysis.projectedEarnings - analysis.currentEarnings).toLocaleString()}`],
      ['Time Saved per Deal', `${analysis.timePerTransaction} hours`, 'Baseline 25hrs minus efficiency']
    ];

    doc.setTextColor(...textColor);
    doc.setFontSize(10);

    successMetrics.forEach(([label, value, description], index) => {
      checkPageBreak(8);
      const rowY = y + (index * 8);
      
      if (index % 2 === 0) {
        doc.setFillColor(...lightGray);
        doc.rect(margin, rowY - 2, contentWidth, 7, 'F');
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin + 5, rowY + 3);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text(value, margin + 80, rowY + 3);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textColor);
      doc.text(description, margin + 120, rowY + 3);
    });
    y += successMetrics.length * 8 + 10;
    
    // Add footnote for projected earnings
    doc.setTextColor(...textColor);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('*Based on industry standard: 1 deal per 6 sphere contacts × $3,500 average commission', margin + 5, y);
    y += 15;

    // Section 4: Market Opportunities
    checkPageBreak(30);
    doc.setFillColor(...primaryColor);
    doc.rect(margin, y - 5, contentWidth, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Market Opportunities', margin + 5, y + 6);
    y += 20;

    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    analysis.marketOpportunities.forEach((opportunity, index) => {
      checkPageBreak(12);
      
      // Bullet point
      doc.setFillColor(...primaryColor);
      doc.circle(margin + 3, y + 2, 1, 'F');
      
      const opportunityLines = doc.splitTextToSize(opportunity, contentWidth - 15);
      doc.text(opportunityLines, margin + 8, y + 3);
      y += opportunityLines.length * 5 + 8;
    });

    // Section 5: Action Plan
    checkPageBreak(30);
    doc.setFillColor(...darkColor);
    doc.rect(margin, y - 5, contentWidth, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Action Plan', margin + 5, y + 6);
    y += 20;

    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    analysis.recommendedActions.forEach((action, index) => {
      checkPageBreak(12);
      
      // Step number
      doc.setFillColor(...darkColor);
      doc.circle(margin + 5, y + 2, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text((index + 1).toString(), margin + 3.5, y + 3.5);
      
      doc.setTextColor(...textColor);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const actionLines = doc.splitTextToSize(action, contentWidth - 20);
      doc.text(actionLines, margin + 12, y + 3);
      y += actionLines.length * 5 + 8;
    });

    // Add new page for REOP Services & Deliverables
    doc.addPage();
    y = margin;

    // REOP Services Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('REOP Services & Deliverables', margin, 25);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Your comprehensive business support system', margin, 35);
    
    y = 65;

    // Service sections
    const services = [
      {
        title: 'Outreach Division',
        items: [
          'SphereSync™ - Automated contact management and follow-up system',
          'Client Events - Quarterly appreciation events and networking opportunities',
          'Homeowner.ai Partnership - Advanced lead generation technology',
          'Social Media Outreach - Professional content and engagement strategies'
        ]
      },
      {
        title: 'Conversion Division', 
        items: [
          'Buyer Blueprint™ - Complete buyer consultation and presentation system',
          'Seller Blueprint™ - Comprehensive listing presentation and market analysis',
          'Objection Crusher Matrix™ - Proven responses to common objections'
        ]
      },
      {
        title: 'Delight Division',
        items: [
          'Client Experience Videos™ - Custom video content for different stages',
          'Vendor Perks - Exclusive discounts and preferred partnerships',
          'Wow Moments - Surprise and delight campaigns for clients'
        ]
      },
      {
        title: 'Performance Division',
        items: [
          'Agent Ops HQ™ - Complete business operations and transaction management system',
          'Weekly coaching sessions with proven industry leaders',
          'Performance analytics and growth tracking',
          'Administrative support and documentation assistance'
        ]
      }
    ];

    services.forEach((service, serviceIndex) => {
      checkPageBreak(25);
      
      // Service title
      doc.setFillColor(...darkColor);
      doc.rect(margin, y - 5, contentWidth, 15, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(service.title, margin + 5, y + 6);
      y += 20;

      // Service items
      doc.setTextColor(...textColor);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      service.items.forEach((item, itemIndex) => {
        checkPageBreak(8);
        
        // Bullet point
        doc.setFillColor(...primaryColor);
        doc.circle(margin + 3, y + 2, 1, 'F');
        
        // Wrap text properly
        const itemLines = doc.splitTextToSize(item, contentWidth - 15);
        doc.text(itemLines, margin + 8, y + 3);
        y += itemLines.length * 4 + 3;
      });
      
      y += 10; // Space between sections
    });

    // Agent Ops HQ tagline
    checkPageBreak(15);
    doc.setFillColor(...lightGray);
    doc.rect(margin, y - 5, contentWidth, 12, 'F');
    
    doc.setTextColor(...darkColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    const taglineText = 'Agent Ops HQ™: Your complete business operations partner';
    doc.text(taglineText, margin + 5, y + 4);
    y += 20;

    // Footer with contact information
    checkPageBreak(35);
    y = Math.max(y + 15, pageHeight - 50);
    
    doc.setFillColor(...primaryColor);
    doc.rect(margin, y - 5, contentWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Ready to Transform Your Business?', margin + 5, y + 10);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Schedule Your Strategy Session with Pam:', margin + 5, y + 20);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'underline');
    doc.text('realestateonpurpose.com/appointmentwithreop', margin + 5, y + 30);
    
    doc.setFont('helvetica', 'normal');
    doc.text('Book your personalized consultation today!', margin + 5, y + 38);

    // Convert to Uint8Array
    const pdfOutput = doc.output('arraybuffer');
    return new Uint8Array(pdfOutput);
  } catch (error) {
    console.error('PDF generation error:', error);
    
    // Enhanced fallback
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Real Estate Success Analysis', 20, 30);
    doc.setFontSize(12);
    doc.text('Your personalized analysis report will be available shortly.', 20, 50);
    doc.text('Please contact support@realestateonpurpose.com for assistance.', 20, 70);
    
    const pdfOutput = doc.output('arraybuffer');
    return new Uint8Array(pdfOutput);
  }
}

async function sendEmailWithPDF(data: FormData, pdfBuffer: Uint8Array, fileName: string): Promise<void> {
  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const emailResponse = await resend.emails.send({
      from: 'Real Estate on Purpose <noreply@market.realestateonpurpose.com>',
      to: [data.email],
      subject: 'Your Real Estate on Purpose Success Analysis is Ready!',
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
              color: #333;
              background-color: #f7fafc;
            }
            
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            
            .header {
              background: linear-gradient(135deg, #00a2ad 0%, #005d6c 100%);
              padding: 40px 30px;
              text-align: center;
              color: white;
            }
            
            
            .header h1 {
              font-size: 28px;
              font-weight: 600;
              margin: 0;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .header p {
              font-size: 16px;
              margin: 10px 0 0 0;
              opacity: 0.95;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .greeting {
              font-size: 20px;
              font-weight: 600;
              color: #005d6c;
              margin-bottom: 15px;
            }
            
            .intro-text {
              font-size: 16px;
              color: #4a5568;
              margin-bottom: 30px;
              line-height: 1.6;
            }
            
            .opportunities-section {
              background: linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%);
              padding: 25px;
              border-radius: 12px;
              border: 2px solid #00a2ad;
              margin-bottom: 25px;
            }
            
            .opportunities-section h3 {
              color: #005d6c;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 15px 0;
              display: flex;
              align-items: center;
            }
            
            .icon-badge {
              background: #00a2ad;
              color: white;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-right: 10px;
              font-size: 16px;
            }
            
            .opportunity-item {
              margin-bottom: 12px;
              padding: 12px;
              background: white;
              border-radius: 8px;
              border-left: 4px solid #00a2ad;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              display: flex;
              align-items: flex-start;
            }
            
            .opportunity-item:last-child {
              margin-bottom: 0;
            }
            
            .checkmark {
              color: #00a2ad;
              font-weight: 600;
              margin-right: 8px;
            }
            
            .actions-section {
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              padding: 25px;
              border-radius: 12px;
              border: 2px solid #00a2ad;
              margin-bottom: 30px;
            }
            
            .actions-section h3 {
              color: #005d6c;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 15px 0;
              display: flex;
              align-items: center;
            }
            
            .action-item {
              margin-bottom: 12px;
              padding: 12px;
              background: white;
              border-radius: 8px;
              border-left: 4px solid #00a2ad;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              position: relative;
              padding-left: 50px;
            }
            
            .action-item:last-child {
              margin-bottom: 0;
            }
            
            .step-number {
              position: absolute;
              left: 12px;
              top: 50%;
              transform: translateY(-50%);
              background: #00a2ad;
              color: white;
              border-radius: 50%;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: bold;
            }
            
            .cta-section {
              text-align: center;
              margin: 40px 0;
              padding: 30px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border-radius: 12px;
            }
            
            .cta-text {
              color: #475569;
              font-size: 16px;
              margin-bottom: 25px;
              font-weight: 500;
            }
            
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #00a2ad 0%, #005d6c 100%);
              color: white;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 8px;
              box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
              font-size: 16px;
            }
            
            .secondary-cta {
              display: inline-block;
              background: linear-gradient(135deg, #00a2ad 0%, #005d6c 100%);
              color: white;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 8px;
              box-shadow: 0 4px 15px rgba(0, 162, 173, 0.3);
              font-size: 16px;
            }
            
            .highlight-box {
              background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
              padding: 25px;
              border-radius: 12px;
              border: 2px solid #d97706;
              margin-bottom: 25px;
              text-align: center;
            }
            
            .highlight-box p {
              margin: 0;
              color: #92400e;
              font-size: 16px;
              font-weight: 500;
              line-height: 1.6;
            }
            
            .footer {
              background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }
            
            .footer h4 {
              margin: 0 0 10px 0;
              color: #00a2ad;
              font-size: 20px;
              font-weight: 600;
            }
            
            .footer-subtitle {
              margin: 0 0 20px 0;
              color: #e2e8f0;
              font-size: 16px;
              font-weight: 500;
            }
            
            .contact-info {
              font-size: 14px;
              color: #94a3b8;
              line-height: 1.8;
            }
            
            .contact-info p {
              margin: 8px 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .contact-info span {
              margin-right: 8px;
            }
            
            @media (max-width: 600px) {
              .content {
                padding: 20px 15px;
              }
              
              .header {
                padding: 30px 20px;
              }
              
              .cta-button, .secondary-cta {
                display: block;
                margin: 10px 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header with Logo -->
            <div class="header">
              <h2 style="color: white; margin: 0; font-size: 28px;">Real Estate on Purpose</h2>
              <h1>Your Success Analysis is Ready!</h1>
              <p>Personalized insights to accelerate your real estate career</p>
            </div>
            
            <!-- Main Content -->
            <div class="content">
              <div class="greeting">Hi ${data.firstName}! 👋</div>
              
              <div class="intro-text">
                Thank you for taking the time to share your real estate journey with us. We analyzed your current situation and created a comprehensive success analysis report tailored specifically for your goals and market.
              </div>

              <!-- Market Opportunities -->
              <div class="opportunities-section">
                <h3>
                  <span class="icon-badge">🎯</span>
                  Your Market Opportunities
                </h3>
                <div class="opportunity-item">
                  <span class="checkmark">✓</span>
                  <span>Optimize your sphere of ${data.sphereSize} contacts for maximum referral potential</span>
                </div>
                <div class="opportunity-item">
                  <span class="checkmark">✓</span>
                  <span>Increase transaction volume through systematic follow-up and professional systems</span>
                </div>
                <div class="opportunity-item">
                  <span class="checkmark">✓</span>
                  <span>Reduce stress and lower your ${data.weeklyHours} hours per week with increased efficiency</span>
                </div>
                <div class="opportunity-item">
                  <span class="checkmark">✓</span>
                  <span>Leverage automated marketing to capture leads you're currently missing</span>
                </div>
              </div>

              <!-- Recommended Actions -->
              <div class="actions-section">
                <h3>
                  <span class="icon-badge">✅</span>
                  Recommended Next Steps
                </h3>
                <div class="action-item">
                  <span class="step-number">1</span>
                  <span>Implement automated lead nurturing system for your Sphere</span>
                </div>
                <div class="action-item">
                  <span class="step-number">2</span>
                  <span>Develop consistent contact strategy to improve referral rates</span>
                </div>
                <div class="action-item">
                  <span class="step-number">3</span>
                  <span>Access professional marketing materials and brand strategy</span>
                </div>
                <div class="action-item">
                  <span class="step-number">4</span>
                  <span>Schedule strategy call to discuss implementation timeline</span>
                </div>
              </div>

              <!-- Call to Action -->
              <div class="cta-section">
                <p class="cta-text">Ready to take action on your real estate goals?</p>
                <a href="https://realestateonpurpose.com/appointmentwithreop" class="cta-button">
                  📅 Schedule a Free Strategy Call
                </a>
                <br>
                <a href="https://realestateonpurpose.com" class="secondary-cta">
                  🌐 Visit Our Website
                </a>
              </div>

              <div class="highlight-box">
                <p>📎 Your attached report contains personalized strategies, market opportunities, and actionable steps designed specifically for your current situation and goals. We're excited to help you build a purpose-driven real estate career!</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <h4>The Real Estate on Purpose Team</h4>
              <p class="footer-subtitle">Building Purpose-Driven Real Estate Careers</p>
              <div class="contact-info">
                <p><span>📧</span> support@realestateonpurpose.com</p>
                <p><span>🌐</span> realestateonpurpose.com</p>
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
Phone: (571)603-7367

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