
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Real Estate On Purpose has revolutionized how I manage my business. The support is unparalleled!",
      author: "Samir Redwan",
      position: "Bluejay Properties Group",
      avatar: "/images/samir-redwan.jpg"
    },
    {
      quote: "The tools and coaching have taken my career to the next level. Highly recommend!",
      author: "Aminda Kadir",
      position: "Bluejay Properties Group",
      avatar: "/images/aminda-kadir.jpg"
    },
    {
      quote: "Finally, a team that truly puts agents first. No fees, all value.",
      author: "Jeff Pennington",
      position: "Team Member since 2025",
      avatar: "/images/jeff-pennington.jpg"
    }
  ];
  
  return (
    <section className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            What Our Agents Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear how Real Estate on Purpose team members are thriving with our support
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-border bg-background/80 backdrop-blur-sm hover:border-border/60 transition-all duration-300"
            >
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary inline-block mr-1">★</span>
                ))}
              </div>
              <p className="text-lg mb-8 text-foreground/90 italic">"{testimonial.quote}"</p>
               <div className="flex items-end gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.author} profile`}
                  className="h-12 w-12 rounded-full object-cover bg-muted"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div className="h-12 w-12 rounded-full bg-muted hidden"></div>
                <div>
                  <h4 className="font-medium text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
