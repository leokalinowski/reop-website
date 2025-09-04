import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Users, 
  Calendar,
  Mail,
  Share2,
  GraduationCap,
  FileText,
  Gift
} from 'lucide-react';
import automatedOutreachImg from '@/assets/automated-outreach.jpg';
import leadManagementImg from '@/assets/lead-management.jpg';
import eventManagementImg from '@/assets/event-management.jpg';
import newsletterImg from '@/assets/newsletter.jpg';
import socialMediaImg from '@/assets/social-media.jpg';
import coachingImg from '@/assets/coaching.jpg';
import transactionCoordinationImg from '@/assets/transaction-coordination.jpg';
import surpriseDelightImg from '@/assets/surprise-delight.jpg';

const FinTechTools = () => {
  const tools = [
    {
      id: 'automated-outreach',
      title: 'Automated Outreach (SphereSync)',
      description: 'Effortlessly connect with clients using AI-powered automation.',
      icon: Zap,
      image: automatedOutreachImg,
      features: [
        'Powered by SphereSync for targeted, personalized outreach',
        'Automates emails, texts, and follow-up sequences',
        'Increases lead engagement with data-driven personalization',
        'Saves agents hours by streamlining communication workflows'
      ]
    },
    {
      id: 'lead-management',
      title: 'Lead Management',
      description: 'Track and nurture leads with an intuitive, automated CRM system.',
      icon: Users,
      image: leadManagementImg,
      features: [
        'Centralized dashboard for all lead activity',
        'Automated lead scoring and segmentation for efficiency',
        'Real-time alerts for timely follow-ups',
        'Integrates with platforms like Zillow or Realtor.com'
      ]
    },
    {
      id: 'event-management',
      title: 'Event Management',
      description: 'Simplify event planning to build stronger client relationships.',
      icon: Calendar,
      image: eventManagementImg,
      features: [
        'Tools for scheduling open houses, webinars, or client events',
        'Automated invitations, RSVPs, and reminders',
        'Post-event follow-up campaigns for engagement',
        'Analytics to track event success and ROI'
      ]
    },
    {
      id: 'newsletter',
      title: 'Automated E-Newsletter (Zip Code Market Report)',
      description: 'Keep clients informed with automated, hyper-local market insights.',
      icon: Mail,
      image: newsletterImg,
      features: [
        'Generates zip code-specific market reports with real-time data',
        'Customizable, branded templates for professional delivery',
        'Automated scheduling and performance tracking',
        'Strengthens client trust with valuable, consistent updates'
      ]
    },
    {
      id: 'social-media',
      title: 'Fully Automated Social Media',
      description: 'Build a powerful online presence without lifting a finger.',
      icon: Share2,
      image: socialMediaImg,
      features: [
        'AI-crafted posts tailored to real estate trends and local markets',
        'Auto-scheduling for Instagram, Facebook, LinkedIn, and more',
        'Monitors engagement and responds to comments automatically',
        'Provides analytics to optimize content strategy'
      ]
    },
    {
      id: 'coaching',
      title: 'Weekly Coaching',
      description: 'Unlock your potential with personalized coaching and resources.',
      icon: GraduationCap,
      image: coachingImg,
      features: [
        'Weekly video or chat sessions tailored to agent goals',
        'Access to proven strategies and templates for success',
        'Progress tracking and accountability tools',
        'Community platform for peer support and collaboration'
      ]
    },
    {
      id: 'transaction-coordination',
      title: 'Transaction Coordination',
      description: 'Streamline deals from contract to close with automated workflows.',
      icon: FileText,
      image: transactionCoordinationImg,
      features: [
        'Automated checklists for every transaction stage',
        'Secure document management and e-signature integration',
        'Compliance tracking to avoid errors',
        'Team collaboration tools for seamless communication'
      ]
    },
    {
      id: 'surprise-delight',
      title: 'Surprise & Delight',
      description: 'Create memorable client experiences with automated gestures.',
      icon: Gift,
      image: surpriseDelightImg,
      features: [
        'Automated gift campaigns for birthdays, closings, or milestones',
        'Personalized thank-you messages and rewards',
        'Integration with e-commerce for easy fulfillment',
        'Feedback tools to measure client satisfaction and loyalty'
      ]
    }
  ];

  return (
    <section id="fintech-tools" className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Powerful Tools for Real Estate Agents
          </h2>
          <p className="text-muted-foreground text-lg">
            Empower your real estate business with cutting-edge technology, AI automation, systems, and validated models designed to help you grow, save time, and perform at your best.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground mb-2">{tool.title}</CardTitle>
                      <p className="text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video overflow-hidden rounded-lg border border-border">
                    <img 
                      src={tool.image} 
                      alt={tool.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <ul className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-sm">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5 flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FinTechTools;