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
              <div className="relative w-full h-[500px] bg-gradient-to-br from-primary/5 to-accent/5">
                <img 
                  src={pamImage} 
                  alt="Pam O'Bryant, CEO and Founder of Real Estate On Purpose"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist yet
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                {/* Fallback placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10" style={{display: 'none'}}>
                  <div className="text-center space-y-4">
                    <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                      <User className="h-16 w-16 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-foreground">Pam O'Bryant</h3>
                      <p className="text-lg text-muted-foreground">CEO & Founder</p>
                    </div>
                  </div>
                </div>
                {/* Overlay with stats */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-medium text-foreground">Pam O'Bryant</h3>
                    <p className="text-lg text-muted-foreground">CEO & Founder</p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2 bg-background/80 rounded-full px-3 py-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">40+ Years</span>
                      </div>
                      <div className="flex items-center gap-2 bg-background/80 rounded-full px-3 py-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-medium">70+ Deals/Year</span>
                      </div>
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