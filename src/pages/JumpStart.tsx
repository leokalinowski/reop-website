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
      what: "We send your weekly SphereSync messages (email, text, video prompt) — you just review and hit send.",
      format: "Done-for-you + automation"
    },
    {
      category: "Weekly Group Coaching",
      what: "Accountability, scripts, objection handling, and action plans — live and recorded.",
      format: "Zoom (recorded)"
    },
    {
      category: "Monthly Skill Workshop",
      what: "High-impact themes: AI, systems, events, referral generation.",
      format: "Live + replay"
    },
    {
      category: "Client Experience Starter Kit",
      what: "3 milestone videos + plug-and-play templates to upgrade your client experience fast.",
      format: "Downloadables"
    },
    {
      category: "Database Power Score™ Audit",
      what: "See your connection %, data gaps, and next steps — like a \"credit score\" for your database.",
      format: "PDF + call"
    },
    {
      category: "Private Community Access",
      what: "A momentum hub for wins, accountability, and resources.",
      format: "Private Facebook group"
    },
    {
      category: "End-of-Program Strategy Call",
      what: "Personalized plan for your next 6 months — whether you keep scaling or move into full REOP.",
      format: "1:1 Zoom"
    }
  ];

  const expectations = [
    "A clean, prioritized database that actually produces conversations",
    "A consistent weekly rhythm (SphereSync + Coaching = execution)",
    "New appointments booked and referrals reopened",
    "The confidence and clarity to sustain growth into Spring 2026"
  ];

  const whyItWorks = [
    "Automation where it helps, accountability where it matters.",
    "Small-group coaching (max 6 agents) so you can't hide.",
    "Momentum in motion: You act while we guide."
  ];

  const faqs = [
    {
      question: "How much time does it take?",
      answer: "About 2–4 hours per week — including your SphereSync outreach and live group call."
    },
    {
      question: "Do I need to change my CRM?",
      answer: "No. We make what you have work better. You'll just upload your CSV for the audit."
    },
    {
      question: "What if I'm on a team?",
      answer: "You can join as a team or request a private cohort. Ask us for team pricing."
    },
    {
      question: "Is there a guarantee?",
      answer: "Yes — if you attend your calls and complete your weekly SphereSyncs, we'll keep coaching you until you book 10 new appointments."
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
            A 6-month reset for agents ready to get their business back.
          </p>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hit reset — and make 2026 your best year ever.
          </p>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            This six-month accelerator helps you clean up your database, rebuild your systems, and reignite momentum so you start the new year confident, organized, and in control of your business again.
          </p>
          
          <Button 
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="text-lg h-14 px-12 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none hover:scale-105"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full py-20 px-6 md:px-12 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              🚧 The Problem Every Agent Knows
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              If your income feels like a rollercoaster, it's not because you're bad at real estate — it's because your systems stopped keeping up with your relationships.
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
            Sound familiar? Every month you wait costs you opportunities already sitting in your sphere.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-10"></div>
        
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
              ⚡ The 6-Month Jump Start™ Fixes That
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We built REOP Jump Start™ as a guided reboot for agents who want consistent income again — without another expensive coaching contract or CRM overhaul.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              It's a done-with-you growth system that combines automation, live accountability, and practical coaching so you can actually follow through.
            </p>
          </div>

          <BackgroundGradient className="rounded-[22px] p-1 mt-12">
            <Card className="cosmic-card p-8 text-center border-0">
              <p className="text-2xl font-medium text-foreground">
                <span className="text-primary">Promise:</span> In six months, you'll have a clean, connected database, a full follow-up rhythm, and booked appointments — guaranteed.
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
                And if you follow the plan but don't book new appointments — <span className="text-primary">we'll keep coaching you until you do.</span>
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
              💡 Why This Works (and Others Don't)
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Most "get more leads" programs sell you more complexity. We focus on what's already in your business — your relationships — and give you the structure to follow through week after week.
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
            This isn't theory — it's the exact rhythm top agents use to rebuild pipelines fast.
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
                onClick={() => setIsFormOpen(true)}
                className="w-full"
                size="lg"
              >
                Get Started
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
                  onClick={() => setIsFormOpen(true)}
                  className="w-full shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  Get Started
                </Button>
              </Card>
            </BackgroundGradient>
          </div>

          <Card className="cosmic-card p-6 text-center max-w-3xl mx-auto">
            <p className="text-lg text-foreground">
              <span className="font-semibold text-primary">Early Enrollment Bonus:</span> Join within 5 days of the webinar and get a free Database Power Score™ Audit (a $297 value).
            </p>
          </Card>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="w-full py-20 px-6 md:px-12 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground">
            🕓 Doors Close Soon
          </h2>
          <p className="text-xl text-muted-foreground">
            Each cohort is capped at 6 agents to keep accountability personal.
          </p>
          <p className="text-lg text-foreground font-medium">
            Enrollment closes 5 days after the webinar — or when groups fill.
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
            Every agent says "I'll get to it soon." The ones who take action now will own the listings by spring.
          </p>
          <p className="text-lg text-foreground">
            You've already built the relationships. This is the system that helps you activate them — and rebuild your pipeline with purpose.
          </p>
          
          <Button 
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="text-lg h-14 px-12 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none hover:scale-110"
          >
            Start Your 6-Month Jump Start™
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