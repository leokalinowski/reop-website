import React from 'react';

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
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
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="space-y-3">
                  <div className="h-32 bg-slate-700 rounded-lg flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <div className="text-4xl mb-2">😰</div>
                      <div className="text-sm">Overwhelmed</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-red-500/30 rounded"></div>
                    <div className="h-2 bg-red-500/30 rounded w-3/4"></div>
                    <div className="h-2 bg-red-500/30 rounded w-1/2"></div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Follow up!</span>
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Urgent</span>
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Late</span>
                  </div>
                </div>
              </div>
              
              {/* Calm agent with dashboard */}
              <div className="bg-slate-800 rounded-xl p-6 border border-primary/30">
                <div className="space-y-3">
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-slate-200">
                      <div className="text-4xl mb-2">😊</div>
                      <div className="text-sm">In Control</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-primary/40 rounded"></div>
                    <div className="h-2 bg-primary/40 rounded w-4/5"></div>
                    <div className="h-2 bg-primary/40 rounded w-3/5"></div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
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
