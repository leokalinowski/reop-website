import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Calendar, Users, TrendingUp, Database, Zap, Shield, Sparkles } from 'lucide-react';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import Header from '@/components/Header';
import FooterMinimal from '@/components/FooterMinimal';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const JumpStart = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const features = [
    {
      category: "SphereSync™ Execution",
      what: "We send your weekly SphereSync messages (email, text, video prompt) — you review and hit send.",
      format: "Done-for-you + automation"
    },
    {
      category: "Weekly Group Coaching",
      what: "Accountability, dialogues, objection handling, and action plans — live and recorded.",
      format: "Zoom (recorded)"
    },
    {
      category: "Monthly Skill Workshops",
      what: "High-impact topics: AI, systems, events, referral generation.",
      format: "Live + replay"
    },
    {
      category: "Client Experience Starter Kit",
      what: "2 milestone videos + plug-and-play templates to upgrade your client experience.",
      format: "Downloadables"
    },
    {
      category: "Database Power Score™ Audit",
      what: "See your data gaps and connection % — like a \"credit score\" for your database.",
      format: "PDF worksheet"
    },
    {
      category: "End-of-Program Strategy Call",
      what: "Personalized plan for your next 6 months — whether you keep scaling or graduate to full REOP.",
      format: "1:1 Zoom"
    }
  ];

  const expectations = [
    "A clean, prioritized database that actually creates conversations",
    "A consistent weekly rhythm (SphereSync + Coaching = Execution)",
    "New appointments booked and referrals re-opened",
    "The clarity and confidence to sustain growth into Spring 2026"
  ];

  const whyItWorks = [
    "Automation where it helps.",
    "Accountability where it matters.",
    "Small-group coaching (max 6 agents) so you can't hide.",
    "Real-time execution — you act while we guide."
  ];

  const faqs = [
    {
      question: "How much time does it take?",
      answer: "Plan 2–4 hours per week — including SphereSync outreach and your group call."
    },
    {
      question: "Do I need a new CRM?",
      answer: "No. We make what you have work better — you'll simply upload your CSV for the audit."
    },
    {
      question: "What if I'm on a team?",
      answer: "Join as a team or request a private cohort (ask about team pricing)."
    },
    {
      question: "Is there a guarantee?",
      answer: "Yes — attend your calls and complete weekly SphereSyncs, and we'll coach you until you book 10 new appointments."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden px-6 md:px-12 pt-32 pb-20">
        <div className="absolute inset-0 cosmic-grid opacity-10"></div>
        <div className="absolute inset-0 cosmic-glow"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 animate-fade-in">
          <Badge className="text-sm px-4 py-2 animate-scale-in border-primary/20 shadow-lg">
            <Sparkles className="w-3 h-3 mr-1 inline" />
            6-Month Program
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-foreground">
            The 6-Month Jump Start™
          </h1>
          
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto">
            Hit Reset — and Fall in Love with Your Business Again
          </p>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule Your Strategy Session with Founder Pam O'Bryant
          </p>
          
          <Button 
            asChild
            size="lg"
            className="text-lg h-14 px-12 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none hover:scale-105"
          >
            <a 
              href="https://link.fastpaydirect.com/payment-link/68ff94c22197098009e30c30"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
            </a>
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full py-20 px-6 md:px-12 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              🚧 The Real Problem (That No One Wants to Admit)
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              If your income feels like a rollercoaster, it's not because you're bad at real estate.
              It's because your systems stopped keeping up with your relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="cosmic-card p-8 text-center space-y-4 hover:scale-105 transition-transform duration-300">
              <p className="text-lg font-medium text-foreground">
                "I'll clean up my database next week."
              </p>
            </Card>
            
            <Card className="cosmic-card p-8 text-center space-y-4 hover:scale-105 transition-transform duration-300">
              <p className="text-lg font-medium text-foreground">
                "I know I should call, but I don't know what to say."
              </p>
            </Card>
            
            <Card className="cosmic-card p-8 text-center space-y-4 hover:scale-105 transition-transform duration-300">
              <p className="text-lg font-medium text-foreground">
                "I'll do it myself... when things slow down."
              </p>
            </Card>
          </div>

          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mt-12">
            And somehow, next week never comes. Every month you wait, opportunities are quietly slipping through the cracks — the ones already sitting in your sphere.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-10"></div>
        
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              ⚡ The REOP 6-Month Jump Start™
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-semibold">
              A Guided Reboot for Agents Who Want Consistent Income Again
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              No expensive coaching contract.
              No tech overhaul.
              Just a done-with-you growth system that blends automation, accountability, and real-world coaching — so you actually follow through.
            </p>
          </div>

          <BackgroundGradient className="rounded-[22px] p-1 mt-12">
            <Card className="cosmic-card p-8 text-center border-0">
              <p className="text-2xl font-medium text-foreground">
                <span className="text-primary">Our promise:</span> In six months, you'll have a clean, connected database, a steady follow-up rhythm, and booked appointments — guaranteed.
              </p>
            </Card>
          </BackgroundGradient>
        </div>
      </section>

      {/* Features Table */}
      <section className="w-full py-20 px-6 md:px-12 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              🔥 What You'll Get
            </h2>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`cosmic-card p-6 grid md:grid-cols-3 gap-4 items-start hover:scale-[1.02] transition-transform duration-300 ${
                  index % 2 === 0 ? 'bg-card' : 'bg-card/50'
                }`}
              >
                <div className="font-semibold text-foreground">{feature.category}</div>
                <div className="text-muted-foreground md:col-span-1">{feature.what}</div>
                <div className="text-sm text-primary font-medium">{feature.format}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expectations Section */}
      <section className="w-full py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-10"></div>
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              💥 What You Can Expect
            </h2>
            <p className="text-xl text-muted-foreground">
              By the end of Jump Start™, you'll have:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {expectations.map((item, index) => (
              <Card key={index} className="cosmic-card p-6 flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg text-foreground">{item}</p>
              </Card>
            ))}
          </div>

          <BackgroundGradient className="rounded-[22px] p-1 mt-12">
            <Card className="cosmic-card p-8 text-center border-0">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-6 h-6 text-primary" />
                <p className="text-xl font-semibold text-primary">Appointment Assurance Guarantee</p>
              </div>
              <p className="text-xl font-medium text-foreground">
                If you follow the plan and don't book new appointments, we'll keep coaching you until you do.
              </p>
            </Card>
          </BackgroundGradient>
        </div>
      </section>

      {/* Why It Works */}
      <section className="w-full py-20 px-6 md:px-12 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              💡 Why This Works (When Others Don't)
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Most "lead gen" programs sell you complexity. We focus on what's already working — your relationships — and give you the rhythm and structure to nurture them consistently.
            </p>
          </div>

          <div className="space-y-4">
            {whyItWorks.map((item, index) => (
              <Card key={index} className="cosmic-card p-6 flex gap-4 items-center">
                <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-lg text-foreground">{item}</p>
              </Card>
            ))}
          </div>

          <p className="text-xl text-center text-muted-foreground italic mt-8">
            This isn't theory. It's the same rhythm top agents use to rebuild momentum and pipelines fast.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-10"></div>
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              💰 Pricing & Enrollment
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="cosmic-card p-8 space-y-6 text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-foreground">Monthly Plan</h3>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">$397</p>
                <p className="text-muted-foreground">per month × 6 months</p>
              </div>
              <Button 
                asChild
                className="w-full"
                size="lg"
              >
                <a 
                  href="https://link.fastpaydirect.com/payment-link/68ff96e267ee3be8ff6a3feb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </Card>

            <BackgroundGradient className="rounded-[22px] p-1">
              <Card className="cosmic-card p-8 space-y-6 text-center border-0 shadow-xl">
                <Badge className="mb-2 animate-pulse">Save $385</Badge>
                <h3 className="text-2xl font-semibold text-foreground">Pay in Full</h3>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">$1,997</p>
                  <p className="text-muted-foreground">one-time payment</p>
                  <p className="text-sm text-primary font-medium">+ Free Personal PR System mini-course</p>
                </div>
                <Button 
                  asChild
                  className="w-full shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <a 
                    href="https://link.fastpaydirect.com/payment-link/68ff94c22197098009e30c30"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </a>
                </Button>
              </Card>
            </BackgroundGradient>
          </div>

        </div>
      </section>

      {/* Urgency Section */}
      <section className="w-full py-20 px-6 md:px-12 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
            🕓 Limited Enrollment
          </h2>
          <p className="text-xl text-muted-foreground">
            Each cohort is capped at 6 agents to keep coaching personal.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-10"></div>
        
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              🧭 FAQ
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="cosmic-card p-6 space-y-3">
                <h3 className="text-xl font-semibold text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 px-6 md:px-12 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full">
          <div className="w-full h-full opacity-10 bg-primary blur-[120px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
            🗝️ Why Join Now
          </h2>
          <p className="text-xl text-muted-foreground">
            Every agent says "I'll get to it soon." In the DMV, sellers chose their listing agent in January, February and March. Agents who act now will own the listings this spring.
          </p>
          <p className="text-lg text-foreground">
            You've already built the relationships.
          </p>
          <p className="text-lg text-foreground">
            This is the system that helps you activate them — and rebuild your pipeline with purpose.
          </p>
          
          <Button 
            asChild
            size="lg"
            className="text-lg h-14 px-12 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none hover:scale-110"
          >
            <a 
              href="https://link.fastpaydirect.com/payment-link/68ff94c22197098009e30c30"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Your 6-Month Jump Start™
            </a>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Small groups fill fast • Personalized coaching • Guaranteed results
          </p>
        </div>
      </section>

      <FooterMinimal />

      <LeadCaptureForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default JumpStart;