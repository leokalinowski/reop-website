const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground leading-tight">
          The Hardest Part Isn't Selling Homes — It's Holding Everything Together.
        </h2>
        
        {/* Body Paragraphs */}
        <div className="max-w-3xl mx-auto text-center space-y-6 text-lg mb-12 text-foreground">
          <p>
            You started in real estate to help people move. But somewhere between chasing leads, juggling closings, and trying to "stay in touch," the joy got buried under the chaos.
          </p>
          <p>
            You don't need another course, app, or coach yelling "do more."
          </p>
          <p className="font-semibold">
            You need clarity, systems, and support — the kind that brings your business back into alignment with your life.
          </p>
          <p className="italic text-muted-foreground">
            Because burnout isn't a badge of honor. It's a signal that something needs to change.
          </p>
        </div>
        
        {/* Split Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Chaos */}
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg bg-gray-300">
            <img 
              src="/images/placeholder-chaos.jpg" 
              alt="Overwhelmed agent with sticky notes" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500">
              <div className="text-center p-8">
                <p className="text-white text-2xl font-bold mb-2">Before</p>
                <p className="text-white/90">Overwhelmed & Scattered</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-foreground">Before: Overwhelmed & Scattered</p>
            </div>
          </div>
          
          {/* Right: Calm */}
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg bg-gray-200">
            <img 
              src="/images/placeholder-calm.jpg" 
              alt="Organized agent with clean dashboard" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/10">
              <div className="text-center p-8">
                <p className="text-primary text-2xl font-bold mb-2">After</p>
                <p className="text-foreground">Organized & In Control</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-foreground">After: Organized & In Control</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
