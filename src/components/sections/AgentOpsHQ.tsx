import { MessageSquare, Target, TrendingUp, Gift } from 'lucide-react';

const AgentOpsHQ = () => {
  const divisions = [
    {
      icon: MessageSquare,
      title: "Outreach Division",
      description: "Keep your sphere connected through SphereSync™, e-newsletters, and done-for-you Client Events."
    },
    {
      icon: Target,
      title: "Conversion Division",
      description: "Guide clients seamlessly from first contact to closing with Buyer & Seller Blueprints and automated nurturing."
    },
    {
      icon: TrendingUp,
      title: "Performance Division",
      description: "Track your real results — conversations → closings — through the Agent Success Scoreboard™ and weekly coaching."
    },
    {
      icon: Gift,
      title: "Delight Loop Division",
      description: "Keep past clients engaged with thoughtful gifts, post-closing touches, and value drops that generate referrals."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground leading-tight">
          We've Built the Systems. You Choose How to Use Them.
        </h2>
        
        {/* Body Copy */}
        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-foreground leading-relaxed">
          REOP (Real Estate on Purpose™) gives you everything you need to grow a referral-based business that actually feels good to run. We've built, tested, and refined the systems top agents use to stay consistent — and now, we bring them to you through our signature Agent Ops HQ™ framework.
        </p>
        
        {/* 4-Quadrant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {divisions.map((division, index) => {
            const Icon = division.icon;
            return (
              <div 
                key={index}
                className="p-8 border-2 border-border rounded-xl hover:border-accent hover:shadow-xl transition-all duration-300 bg-card"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{division.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {division.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* CTA Link */}
        <div className="text-center">
          <a 
            href="#framework" 
            className="text-accent font-semibold hover:underline underline-offset-4 transition-all text-lg inline-flex items-center gap-2"
          >
            Explore the Agent Ops HQ Framework →
          </a>
        </div>
      </div>
    </section>
  );
};

export default AgentOpsHQ;
