import { Button } from '@/components/ui/button';

const ComparisonTable = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground leading-tight">
          The Plug and Play Business for Successful Agents
        </h2>
        
        {/* Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* DIY Agent Column */}
          <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
            <h3 className="text-2xl font-bold mb-6 text-primary">DIY Agent</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">You want…</p>
                <p className="text-foreground">To learn <strong>and</strong> implement the systems yourself, at your own pace.</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">You get…</p>
                <p className="text-foreground">Access to REOP frameworks, checklists, templates, and weekly "Agent Love Letters."</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Ideal for…</p>
                <p className="text-foreground">Independent agents who love learning and want to stay hands-on.</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Your investment…</p>
                <p className="text-foreground font-semibold">Database Domination Sprint $_____</p>
              </div>
            </div>
            
            <Button 
              className="mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-base font-semibold"
            >
              Explore DIY Systems Access →
            </Button>
          </div>
          
          {/* Supported Agent Column */}
          <div className="bg-card p-8 rounded-xl shadow-lg border-2 border-accent relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            
            <h3 className="text-2xl font-bold mb-6 text-primary">Supported Agent</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">You want…</p>
                <p className="text-foreground">To have REOP's team set up <strong>and</strong> manage your systems so you can focus on clients.</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">You get…</p>
                <p className="text-foreground">Done-for-you SphereSync™, executed Client Events, weekly coaching <strong>and</strong> more.</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Ideal for…</p>
                <p className="text-foreground">Agents ready to delegate operations and focus on growth.</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Your investment…</p>
                <p className="text-foreground font-semibold">25% referral fee on closings.</p>
              </div>
            </div>
            
            <Button 
              className="mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-base font-semibold"
            >
              Explore Supported Agent Model →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
