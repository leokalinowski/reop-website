import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { UserPlus, CheckCircle } from 'lucide-react';


const WeeklyCoaching = () => {
  const features = [
    "Led by industry pros to sharpen skills, share proven tactics, and overcome obstacles",
    "Provides actionable insights and motivation to propel your business forward",
    "Helps you achieve ambitious goals faster with expert guidance",
    "Dynamic weekly sessions designed for accelerated growth and skill development"
  ];

  return (
    <section id="weekly-coaching" className="w-full py-20 px-6 md:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <CardContainer className="inter-var">
              <CardBody className="bg-gradient-to-br from-accent/5 to-primary/5 relative group/card border border-border rounded-xl p-6 h-auto w-auto">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-foreground"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <CardItem translateZ="100" className="w-full">
                        <img 
                          src="/images/coaching.png" 
                          alt="Weekly Coaching Dashboard"
                          className="w-full max-h-80 object-contain rounded-lg"
                        />
                    </CardItem>
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent rounded-lg"></div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <UserPlus className="h-4 w-4 mr-2" />
                Weekly Coaching
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Accelerate Your Growth
              </h2>
              <p className="text-lg text-muted-foreground">
                Accelerate your growth with personalized, expert guidance in our dynamic weekly sessions designed to help you achieve ambitious goals faster.
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

export default WeeklyCoaching;