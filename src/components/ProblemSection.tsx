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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 leading-tight">
              The Hardest Part Isn't Selling Homes — It's Holding Everything Together.
            </h2>
            
            <div className="space-y-4 text-lg text-slate-200">
              <p>
                You started in real estate to help people move. But somewhere between chasing leads, juggling closings, and trying to "stay in touch," the joy got buried under the chaos.
              </p>
              
              <p>
                You don't need another course, app, or coach yelling "do more."
              </p>
              
              <p>
                You need clarity, systems, and support — the kind that brings your business back into alignment with your life.
              </p>
            </div>
            
            <p className="text-xl text-primary font-medium pt-4">
              Because burnout isn't a badge of honor. It's a signal that something needs to change.
            </p>
          </div>
          
          {/* Right side - Visual contrast */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Chaotic agent */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="relative h-48">
                  <img 
                    src={chaoticAgent} 
                    alt="Overwhelmed real estate agent surrounded by sticky notes and chaos" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent"></div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-center text-slate-300 font-medium">Overwhelmed</div>
                  <div className="flex gap-1 flex-wrap justify-center">
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Follow up!</span>
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Urgent</span>
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Late</span>
                  </div>
                </div>
              </div>
              
              {/* Calm agent with dashboard */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-primary/30">
                <div className="relative h-48">
                  <img 
                    src={calmAgent} 
                    alt="Calm organized real estate agent reviewing dashboard" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent"></div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-center text-slate-300 font-medium">In Control</div>
                  <div className="flex gap-1 flex-wrap justify-center">
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">On track</span>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Organized</span>
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

export default ProblemSection;
