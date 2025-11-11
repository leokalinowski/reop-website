import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { Zap, CheckCircle } from 'lucide-react';
import automatedOutreachImage from '@/assets/images/automated-outreach.png';


const AutomatedOutreach = () => {
  const features = [
    "Every week, we send you a curated list of contacts to reach out to—cross-checked against DNC lists",
    "You receive ready-to-use conversation starters to make outreach easy and effective",
    "Stay consistent with your sphere without wondering who to call or what to say",
    "Save hours each week while building stronger relationships that lead to more closings"
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
                Never Wonder Who to Call This Week
              </h2>
              <p className="text-lg text-muted-foreground">
                We curate your weekly contact list and give you the conversation starters—you make the calls and close the deals.
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
                        src={automatedOutreachImage} 
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