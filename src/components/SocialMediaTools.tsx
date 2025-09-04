import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, CheckCircle } from 'lucide-react';
import socialMediaImg from '@/assets/social-media.jpg';

const SocialMediaTools = () => {
  const features = [
    "AI-crafted posts tailored to real estate trends and local markets",
    "Auto-scheduling for Instagram, Facebook, LinkedIn, and more",
    "Monitors engagement and responds to comments automatically",
    "Provides analytics to optimize content strategy"
  ];

  return (
    <section id="social-media-tools" className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <Share2 className="h-4 w-4 mr-2" />
                Social Media Tools
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Fully Automated Social Presence
              </h2>
              <p className="text-lg text-muted-foreground">
                Build a powerful online presence without lifting a finger. Our AI handles content creation, scheduling, and engagement.
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
          
          <div className="relative">
            <div className="cosmic-glow rounded-xl overflow-hidden">
              <img 
                src={socialMediaImg} 
                alt="Social Media Tools Dashboard"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaTools;