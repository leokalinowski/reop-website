import React from 'react';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Database, Target, Calendar, Mail, Users, FileText } from 'lucide-react';

const ValueProposition = () => {
  const benefits = [
    {
      title: "SphereSync & Digital Presence",
      description: "Revolutionize your database management with automated connections and dominate social media effortlessly with expert human content creation – no AI, just professional touch.",
      icon: Database
    },
    {
      title: "Lead Management & Tracking", 
      description: "Gain crystal-clear insights into your leads with advanced tracking that cross-references real-time data with DNC Lists for secure, compliant visibility and maximum conversion.",
      icon: Target
    },
    {
      title: "Event Management",
      description: "Leave the heavy lifting to us – we handle every detail of your client events so you can shine in building relationships and creating memorable experiences that generate referrals.",
      icon: Calendar
    },
    {
      title: "Newsletter & Content Tools",
      description: "Elevate your client engagement with seamless newsletter creation and distribution using intuitive tools for designing and sending professional content that builds trust.",
      icon: Mail
    },
    {
      title: "Weekly Coaching Sessions",
      description: "Accelerate your growth with personalized, expert guidance in dynamic weekly sessions led by industry pros to sharpen skills, share proven tactics, and overcome obstacles.",
      icon: Users
    },
    {
      title: "Transaction Coordination",
      description: "Reclaim your time and peace of mind with our end-to-end transaction handling – we execute everything flawlessly from contract to close with precision and care.",
      icon: FileText
    }
  ];

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-secondary/20 relative overflow-hidden">
      {/* Dark ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-secondary/10 to-primary/20" />
      
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground">
            Why Choose Real Estate on Purpose Team?
          </h2>
          <p className="text-white/80 text-xl leading-relaxed">
            Experience a unique team approach that provides comprehensive support, proven systems, and tools without any financial burden. We help you perform at a higher level by providing the resources and guidance to focus on what matters most – building meaningful client relationships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <BackgroundGradient
                key={index}
                className="rounded-[22px] w-full"
                containerClassName="group"
              >
                <div className="bg-background/95 rounded-3xl p-6 md:p-8 space-y-6 min-h-[360px] flex flex-col hover:scale-[1.02] transition-transform duration-300 border border-white/10">
                  <div className="flex items-center justify-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </BackgroundGradient>
            );
          })}
        </div>
        
        {/* Bottom accent */}
        <div className="flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;