import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { Mail, CheckCircle } from 'lucide-react';
import newsletterImage from '@/assets/images/newsletter.png';


const NewsletterTools = () => {
  const features = [
    "Every month, we send a custom newsletter written specifically for your contacts",
    "Content is tailored to each recipient's zip code with hyperlocal market data and insights",
    "Positions you as the neighborhood expert and starts conversations that lead to listings",
    "Zero effort on your part—we write it, personalize it, and send it for you"
  ];

  return (
    <section id="newsletter-tools" className="w-full py-20 px-6 md:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <CardContainer className="inter-var">
              <CardBody className="bg-gradient-to-br from-primary/5 to-accent/5 relative group/card border border-border rounded-xl p-6 h-auto w-auto">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-foreground"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <CardItem translateZ="100" className="w-full">
                        <img 
                          src={newsletterImage} 
                          alt="Newsletter Tools Dashboard"
                          className="w-full max-h-80 object-contain rounded-lg"
                        />
                    </CardItem>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-lg"></div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <Mail className="h-4 w-4 mr-2" />
                Newsletter Tools
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Hyperlocal Market Intelligence. Sent Monthly. Written for You.
              </h2>
              <p className="text-lg text-muted-foreground">
                We write and send custom newsletters tailored to each contact's zip code—keeping you top-of-mind as the neighborhood expert.
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