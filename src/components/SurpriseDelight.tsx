import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, CheckCircle } from 'lucide-react';


const SurpriseDelight = () => {
  const features = [
    "Tailored surprises that go beyond expectations, encouraging referrals and repeat business",
    "Thoughtful, personalized initiatives that create lasting impressions",
    "Strengthens your brand as a caring, attentive agent in a competitive market",
    "Fosters client loyalty through memorable experiences and exceptional service"
  ];

  return (
    <section id="surprise-delight" className="w-full py-20 px-6 md:px-12 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="cosmic-glow rounded-xl overflow-hidden">
              <img 
                src="/images/surprise-delight.png" 
                alt="Surprise & Delight Dashboard"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <Heart className="h-4 w-4 mr-2" />
                Surprise & Delight
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Create Memorable Experiences
              </h2>
              <p className="text-lg text-muted-foreground">
                Create lasting impressions and foster client loyalty through thoughtful, personalized initiatives that set you apart in the market.
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

export default SurpriseDelight;