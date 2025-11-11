import React, { useState, useEffect, useRef } from 'react';
import chaoticAgent from '@/assets/images/chaotic-agent.jpg';
import calmAgent from '@/assets/images/calm-agent.jpg';

const ProblemSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-6 bg-slate-900">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Sound familiar?
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 leading-tight">
                The Hardest Part Isn't Selling Homes—It's Holding Everything Together.
              </h2>
            </div>
            
            <div className="space-y-6 text-base leading-relaxed text-slate-200">
              <p>
                You started in real estate to build relationships and help people move. But somewhere between chasing leads and juggling closings, the joy got buried under the chaos.
              </p>
              
              <p>
                You don't need another course or app. You need systems that work—the kind that bring your business back into alignment with your life.
              </p>
            </div>
            
            <p className="text-2xl md:text-3xl text-slate-50 font-bold leading-tight pt-4 border-l-4 border-primary pl-6">
              Burnout isn't a badge of honor. It's a signal.
            </p>
          </div>
          
          {/* Right side - Visual contrast */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Chaotic agent */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                <div className="relative h-56">
                  <img 
                    src={chaoticAgent} 
                    alt="Overwhelmed real estate agent surrounded by sticky notes and chaos" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/90 to-transparent"></div>
                </div>
                <div className="p-5">
                  <div className="text-center text-red-300 font-semibold text-lg">Overwhelmed</div>
                </div>
              </div>
              
              {/* Calm agent with dashboard */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-primary/40 shadow-lg shadow-primary/10">
                <div className="relative h-56">
                  <img 
                    src={calmAgent} 
                    alt="Calm organized real estate agent reviewing dashboard" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/90 to-transparent"></div>
                </div>
                <div className="p-5">
                  <div className="text-center text-primary font-semibold text-lg">In Control</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
