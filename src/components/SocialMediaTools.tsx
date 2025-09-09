import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { Share2, CheckCircle } from 'lucide-react';


const SocialMediaTools = () => {
  const features = [
    "We record, professionally edit, and schedule your content to maintain consistency",
    "Hands-on content creation and management service – no AI involved, just expert human touch",
    "Maintains a consistent, top-of-mind presence across all platforms",
    "Delivers detailed analytics for performance tracking and strategy refinement"
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
                Dominate social media effortlessly with our hands-on content creation and management service that maximizes your online impact for more leads and closings.
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
          
          <CardContainer className="inter-var">
            <CardBody className="bg-gradient-to-br from-secondary/5 to-accent/5 relative group/card border border-border rounded-xl p-6 h-auto w-auto">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-foreground"
              >
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <CardItem translateZ="100" className="w-full">
                      <img 
                        src="/images/social-media.png" 
                        alt="Social Media Tools Dashboard"
                        className="w-full max-h-80 object-contain rounded-lg"
                      />
                  </CardItem>
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent rounded-lg"></div>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaTools;