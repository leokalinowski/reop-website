import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Users, Calendar, Mail, Share2, UserPlus, FileText, Heart } from 'lucide-react';

// Import generated images
import automatedOutreachImg from '@/assets/automated-outreach.jpg';
import leadManagementImg from '@/assets/lead-management.jpg';
import eventManagementImg from '@/assets/event-management.jpg';
import newsletterImg from '@/assets/newsletter.jpg';
import socialMediaImg from '@/assets/social-media.jpg';
import coachingImg from '@/assets/coaching.jpg';
import transactionImg from '@/assets/transaction.jpg';
import surpriseDelightImg from '@/assets/surprise-delight.jpg';

const FintechTools = () => {
  const tools = [
    {
      title: "Automated Outreach (SphereSync)",
      description: "Effortlessly connect with clients using AI-powered automation.",
      features: [
        "Powered by SphereSync for targeted, personalized outreach.",
        "Automates emails, texts, and follow-up sequences.",
        "Increases lead engagement with data-driven personalization.",
        "Saves agents hours by streamlining communication workflows."
      ],
      icon: Zap,
      image: automatedOutreachImg,
      color: "from-primary to-secondary"
    },
    {
      title: "Lead Management",
      description: "Track and nurture leads with an intuitive, automated CRM system.",
      features: [
        "Centralized dashboard for all lead activity.",
        "Automated lead scoring and segmentation for efficiency.",
        "Real-time alerts for timely follow-ups.",
        "Integrates with platforms like Zillow or Realtor.com."
      ],
      icon: Users,
      image: leadManagementImg,
      color: "from-secondary to-accent"
    },
    {
      title: "Event Management",
      description: "Simplify event planning to build stronger client relationships.",
      features: [
        "Tools for scheduling open houses, webinars, or client events.",
        "Automated invitations, RSVPs, and reminders.",
        "Post-event follow-up campaigns for engagement.",
        "Analytics to track event success and ROI."
      ],
      icon: Calendar,
      image: eventManagementImg,
      color: "from-accent to-primary"
    },
    {
      title: "Automated E-Newsletter (Zip Code Market Report)",
      description: "Keep clients informed with automated, hyper-local market insights.",
      features: [
        "Generates zip code-specific market reports with real-time data.",
        "Customizable, branded templates for professional delivery.",
        "Automated scheduling and performance tracking.",
        "Strengthens client trust with valuable, consistent updates."
      ],
      icon: Mail,
      image: newsletterImg,
      color: "from-primary to-secondary"
    },
    {
      title: "Fully Automated Social Media",
      description: "Build a powerful online presence without lifting a finger.",
      features: [
        "AI-crafted posts tailored to real estate trends and local markets.",
        "Auto-scheduling for Instagram, Facebook, LinkedIn, and more.",
        "Monitors engagement and responds to comments automatically.",
        "Provides analytics to optimize content strategy."
      ],
      icon: Share2,
      image: socialMediaImg,
      color: "from-secondary to-accent"
    },
    {
      title: "Weekly Coaching",
      description: "Unlock your potential with personalized coaching and resources.",
      features: [
        "Weekly video or chat sessions tailored to agent goals.",
        "Access to proven strategies and templates for success.",
        "Progress tracking and accountability tools.",
        "Community platform for peer support and collaboration."
      ],
      icon: UserPlus,
      image: coachingImg,
      color: "from-accent to-primary"
    },
    {
      title: "Transaction Coordination",
      description: "Streamline deals from contract to close with automated workflows.",
      features: [
        "Automated checklists for every transaction stage.",
        "Secure document management and e-signature integration.",
        "Compliance tracking to avoid errors.",
        "Team collaboration tools for seamless communication."
      ],
      icon: FileText,
      image: transactionImg,
      color: "from-primary to-secondary"
    },
    {
      title: "Surprise & Delight",
      description: "Create memorable client experiences with automated gestures.",
      features: [
        "Automated gift campaigns for birthdays, closings, or milestones.",
        "Personalized thank-you messages and rewards.",
        "Integration with e-commerce for easy fulfillment.",
        "Feedback tools to measure client satisfaction and loyalty."
      ],
      icon: Heart,
      image: surpriseDelightImg,
      color: "from-secondary to-accent"
    }
  ];

  return (
    <section id="tools" className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            Fintech Tools for Real Estate Agents
          </Badge>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Empower Your Real Estate Business with Cutting-Edge Technology
          </h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive suite of AI-powered tools helps real estate agents grow, save time, and perform at their best
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 bg-card border-border overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={tool.image} 
                    alt={tool.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className="absolute top-4 left-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-medium tracking-tight text-foreground">
                    {tool.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {tool.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {tool.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5 flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FintechTools;