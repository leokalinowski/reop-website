import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User, Award, Calendar } from 'lucide-react';
import pamImage from '@/assets/images/pamobryant.png';

const CEOSection = () => {
  const [imageSrc, setImageSrc] = useState("/lovable-uploads/0fd3c82e-6c0c-481f-af2a-71ee027b0690.png");
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    console.log("Uploaded image failed to load, switching to local fallback");
    setImageSrc(pamImage);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully:", imageSrc);
    setImageLoading(false);
  };

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
          
          <div className="space-y-6">
            {/* Image Container */}
            <div className="cosmic-glow rounded-xl overflow-hidden max-w-[300px] mx-auto">
              <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/5 to-accent/5">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                )}
                <img 
                  src={imageSrc}
                  alt="Pam O'Bryant, CEO and Founder of Real Estate On Purpose"
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
            
            {/* Text Info Card */}
            <Card className="max-w-[300px] mx-auto bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-medium text-foreground">Pam O'Bryant</h3>
                  <p className="text-lg text-muted-foreground">CEO & Founder</p>
                </div>
                
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">40+ Years</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">70+ Deals/Year</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;