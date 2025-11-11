
import React from 'react';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const testimonials = [
    {
      videoUrl: "/videos/testimonials/samir-redwan.mp4",
      posterUrl: "/videos/testimonials/samir-redwan-poster.jpg",
      quote: "I finally stopped spinning my wheels.",
      author: "Samir Redwan",
      company: "BlueJay Properties Group"
    },
    {
      videoUrl: "/videos/testimonials/john-benedictis.mp4",
      posterUrl: "/videos/testimonials/john-benedictis-poster.jpg",
      quote: "The systems did what I never had time to build.",
      author: "John Benedictis",
      company: "Platinum Home Team"
    },
    {
      videoUrl: "/videos/testimonials/jeff-pennington.mp4",
      posterUrl: "/videos/testimonials/jeff-pennington-poster.jpg",
      quote: "For the first time in years, I took a real vacation.",
      author: "Jeff Pennington",
      company: "Jeff Sells Nova"
    }
  ];
  
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-slate-900 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-slate-50">
            Real Agents. Real Results.
          </h2>
          <p className="text-slate-200 text-lg">
            From overwhelmed and overworked to organized and in control — REOP agents are rediscovering why they fell in love with real estate in the first place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <video 
                className="w-full aspect-[9/16] object-cover bg-slate-100"
                src={testimonial.videoUrl}
                poster={testimonial.posterUrl}
                controls
                preload="metadata"
                aria-label={`Video testimonial from ${testimonial.author}`}
              >
                Your browser does not support the video tag.
              </video>
              <div className="p-6">
                <p className="text-lg mb-4 text-slate-900 italic font-medium">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-medium text-slate-900">{testimonial.author}</h4>
                  <p className="text-sm text-slate-600">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            🎥 Watch Their Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
