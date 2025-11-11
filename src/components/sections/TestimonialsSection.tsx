import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "I finally stopped spinning my wheels.",
      thumbnail: "/images/testimonial-1.jpg"
    },
    {
      quote: "The systems did what I never had time to build.",
      thumbnail: "/images/testimonial-2.jpg"
    },
    {
      quote: "For the first time in years, I took a real vacation.",
      thumbnail: "/images/testimonial-3.jpg"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground leading-tight">
          Real Agents. Real Results.
        </h2>
        
        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-foreground leading-relaxed">
          From overwhelmed and overworked to organized and in control — REOP agents are rediscovering why they fell in love with real estate in the first place.
        </p>
        
        {/* 3-Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative aspect-[9/16] bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            >
              {/* Video Thumbnail Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-accent ml-1" fill="currentColor" />
                </div>
              </div>
              
              {/* Quote */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium drop-shadow-lg">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-base font-semibold"
          >
            🎥 Watch Their Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
