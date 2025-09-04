import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, CheckCircle } from 'lucide-react';
import automatedOutreachImg from '@/assets/automated-outreach.jpg';

const AutomatedOutreach = () => {
  const features = [
    "Powered by SphereSync for targeted, personalized outreach",
    "Automates emails, texts, and follow-up sequences",
    "Increases lead engagement with data-driven personalization",
    "Saves agents hours by streamlining communication workflows"
  ];

  return (
    <section id="automated-outreach" className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <Zap className="h-4 w-4 mr-2" />
                Automated Outreach
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Effortless Client Connection with SphereSync
              </h2>
              <p className="text-lg text-muted-foreground">
                Connect with clients using AI-powered automation that personalizes every touchpoint and streamlines your communication workflow.
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
                src={automatedOutreachImg} 
                alt="Automated Outreach Dashboard"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomatedOutreach;