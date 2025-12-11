import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      youtubeId: "v9CbYlbrXOo",
      author: "Aminda Kadir"
    },
    {
      youtubeId: "0akPYBucSLg",
      author: "Jeff Pennington"
    }
  ];
  
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-secondary/10 to-primary/20" />
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Real Agents. Real Results.
          </h2>
          <p className="text-white/95 text-lg">
            From overwhelmed and overworked to organized and in control — REOP agents are rediscovering why they fell in love with real estate in the first place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-full aspect-video rounded-xl shadow-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${testimonial.youtubeId}`}
                  title={`Video testimonial from ${testimonial.author}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-lg font-medium text-foreground">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
