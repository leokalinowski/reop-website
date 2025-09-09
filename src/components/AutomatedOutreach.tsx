import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { Zap, CheckCircle } from 'lucide-react';


const AutomatedOutreach = () => {
  const features = [
    "Automates connections without sending any emails, texts, or communications on your behalf",
    "Ensures you remain in full control of all client communications",
    "Empowers you to nurture genuine relationships, fostering loyalty and long-term success",
    "Revolutionizes database management with effortless client relationship maintenance"
  ];

  return (
    <section id="automated-outreach" className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <Zap className="h-4 w-4 mr-2" />
                SphereSync
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Automate Your Client Connections
              </h2>
              <p className="text-lg text-muted-foreground">
                Revolutionize your database management with SphereSync, the ultimate tool for effortless client relationship maintenance that keeps you in complete control.
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
            <CardBody className="bg-gradient-to-br from-primary/5 to-accent/5 relative group/card border border-border rounded-xl p-6 h-auto w-auto">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-foreground"
              >
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <CardItem translateZ="100" className="w-full">
                      <img 
                        src="/images/automated-outreach.png" 
                        alt="Automated Outreach Dashboard"
                        className="w-full max-h-80 object-contain rounded-lg"
                      />
                  </CardItem>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-lg"></div>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  );
};

export default AutomatedOutreach;