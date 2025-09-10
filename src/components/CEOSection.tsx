import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, Award, Calendar } from 'lucide-react';
import pamImage from '@/assets/images/pamobryant.png';

const CEOSection = () => {
  const achievements = [
    "Over 40 years of real estate experience, licensed since 1981",
    "Former Keller Williams executive and Master Faculty member",
    "Proven system: 70+ deals per year with no cold calls",
    "Nationally recognized real estate coach and author"
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="mb-4">
                <User className="h-4 w-4 mr-2" />
                Leadership
              </Badge>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                Meet Our CEO and Founder: Pam O'Bryant
              </h2>
              <p className="text-lg text-muted-foreground">
                Pam O'Bryant is the visionary CEO and Founder of Real Estate On Purpose. With over 40 years of experience in the real estate industry, licensed since 1981, Pam has been involved in every facet of the business – from selling homes and managing offices to serving as a general manager.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-foreground">
                Her illustrious career includes a long tenure with Keller Williams (KW), where she joined the San Antonio office in 1997 at its inception and rose to become a key executive. Pam is a nationally recognized real estate coach, author, and entrepreneur, specializing in systems, business development, and leadership coaching.
              </p>
              
              <p className="text-foreground">
                Pam built a proven system that helped her close over 70 deals per year consistently, with no cold calls and no cold outreach, focusing instead on strategic client engagement and referrals. Under Pam's leadership, Real Estate On Purpose is dedicated to empowering agents with the tools and support they need to succeed without unnecessary burdens.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="cosmic-glow rounded-xl overflow-hidden">
              <div className="relative w-full h-96">
                <img 
                  src={pamImage} 
                  alt="Pam O'Bryant, CEO & Founder" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center space-y-2">
                  <div>
                    <h3 className="text-xl font-medium text-foreground">Pam O'Bryant</h3>
                    <p className="text-muted-foreground">CEO & Founder</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>40+ Years</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>70+ Deals/Year</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;