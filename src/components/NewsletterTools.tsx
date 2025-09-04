import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle } from 'lucide-react';
import newsletterImg from '@/assets/images/newsletter.jpg';

const NewsletterTools = () => {
  const features = [
    "Intuitive tools for designing, customizing, and sending professional newsletters",
    "Keeps your audience informed and connected with regular updates",
    "Builds trust and positions you as the go-to expert in your market",
    "Drives sustained interest in your services and strengthens client relationships"
  ];

  return (
    <section id="newsletter-tools" className="w-full py-20 px-6 md:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="cosmic-glow rounded-xl overflow-hidden">
              <img 
                src={newsletterImg} 
                alt="Newsletter Tools Dashboard"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <Mail className="h-4 w-4 mr-2" />
                Newsletter Tools
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Elevate Your Client Engagement
              </h2>
              <p className="text-lg text-muted-foreground">
                Elevate your client engagement with seamless newsletter creation and distribution that keeps your audience informed and connected.
              </p>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterTools;