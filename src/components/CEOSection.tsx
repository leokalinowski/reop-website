import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Award, Calendar } from 'lucide-react';
import pamImage from '@/assets/images/pamobryant.png';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const CEOSection = () => {
  const [imageSrc, setImageSrc] = useState("/lovable-uploads/0fd3c82e-6c0c-481f-af2a-71ee027b0690.png");
  const [imageLoading, setImageLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleImageError = () => {
    console.log("Uploaded image failed to load, switching to local fallback");
    setImageSrc(pamImage);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully:", imageSrc);
    setImageLoading(false);
  };

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
                Hey, I'm Pam — and I Built REOP for Agents Like You.
              </h2>
              <p className="text-lg text-muted-foreground">
                After nearly three decades in real estate — from building teams to teaching across the country — I saw too many talented agents burning out.
              </p>
            </div>
            
            <div className="space-y-6">
              <p className="text-foreground">
                They didn't need more motivation. They needed clarity, accountability, and a little help implementing what they already knew worked.
              </p>
              
              <p className="text-foreground">
                That's why I built REOP: a modern, human-centered platform where agents can focus on what they do best — building relationships — while we handle the rest.
              </p>
              
              <div className="pt-2">
                <p className="text-xl text-primary border-l-4 border-primary pl-4 py-2">
                  Ready to get your time, energy, and joy back? I'd love to talk.
                </p>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => setIsFormOpen(true)} 
                  size="lg" 
                  className="h-14 px-8"
                >
                  Book a Discovery Call
                </Button>
              </div>
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

      <LeadCaptureForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
};

export default CEOSection;