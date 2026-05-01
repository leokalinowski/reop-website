import { useEffect } from 'react';
import { Compass, Target, Route, Users, HandHeart, Megaphone, ArrowRight, Quote } from 'lucide-react';
import Logo from '@/components/Logo';
import FooterMinimal from '@/components/FooterMinimal';
import SEO from '@/components/SEO';
import LightRays from '@/components/LightRays';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BOOKING_EMBED_URL = 'https://api.leadconnectorhq.com/widget/booking/1uo9a78lRzWFduSFnIxD';
const BOOKING_EMBED_ID = '1uo9a78lRzWFduSFnIxD_1777576100527';

const scrollToBook = () => {
  const el = document.getElementById('book');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Call = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Inject GHL form embed script (loads once, idempotent)
    const SRC = 'https://link.msgsndr.com/js/form_embed.js';
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement('script');
      s.src = SRC;
      s.type = 'text/javascript';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      <SEO
        title="Book a Strategy Call — Real Estate on Purpose"
        description="Book a strategy call with Real Estate on Purpose. We'll help you identify the next best step for your real estate business — better follow-up, guided growth, or full-service marketing support."
      />

      {/* 1. HERO */}
      <section className="relative px-6 pt-8 pb-16 md:pb-24 overflow-hidden bg-background">
        {/* Logo overlaid on hero background */}
        <div className="relative z-20 w-full flex justify-center pb-8">
          <Logo />
        </div>

        {/* Light Rays Background Effect - Hidden on mobile for performance */}
        <div className="absolute inset-0 z-[1] hidden md:block">
          <LightRays
            raysColor="#005d6c"
            raysOrigin="top-center"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            mouseInfluence={0}
            noiseAmount={0.13}
            distortion={0}
            pulsating={true}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        {/* Mobile background fallback */}
        <div className="absolute inset-0 z-[1] md:hidden">
          <div className="cosmic-gradient h-full w-full" />
          <div className="absolute inset-0 cosmic-grid opacity-20" />
        </div>

        {/* Cosmic grid overlay - desktop */}
        <div className="absolute inset-0 cosmic-grid opacity-30 z-[2] hidden md:block" />

        {/* Gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full z-[2] pointer-events-none">
          <div className="w-full h-full opacity-5 md:opacity-10 bg-primary blur-[60px] md:blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="text-primary border-primary/30 px-4 py-1 text-sm tracking-wide max-w-3xl whitespace-normal text-center leading-snug h-auto">
            A practical call for real estate agents who know there is more opportunity in their business than they are currently using.
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.08] text-foreground">
            Turn the relationships you already have into a{' '}
            <span className="text-primary">clearer, calmer growth plan.</span>
          </h1>
          <div className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance space-y-4">
            <p>
              You do not need another generic marketing plan. You need to know where your best opportunities
              are hiding, what follow-up should happen next, and which kind of support actually fits your
              business right now.
            </p>
            <p>
              On this call, we will look at your sphere, past clients, warm relationships, current systems,
              and growth goals so you leave with a more intentional next step.
            </p>
          </div>
          <div className="pt-4">
            <Button onClick={scrollToBook} size="lg" className="text-base md:text-lg px-8 py-6 rounded-xl">
              Book Your Call
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto pt-2">
            Even if we are not the right fit, you will leave with more clarity than you came in with.
          </p>
        </div>
      </section>

      {/* 2. WHAT WE'LL COVER */}
      <section className="px-6 py-16 md:py-24 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              What we'll figure out <span className="text-primary">together</span>
            </h2>
            <div className="mt-4 text-lg text-muted-foreground leading-relaxed space-y-3">
              <p>This call is not about pushing you into a program.</p>
              <p>
                It is about understanding where your business is today, where opportunity is being missed,
                and what would make follow-up feel less reactive and more doable.
              </p>
              <p>
                We will talk through what is working, what feels messy, and what kind of support would
                actually help.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                title: 'Where your best opportunities already are',
                paragraphs: [
                  'Most agents are sitting on more opportunity than they realize: past clients, old leads, vendor relationships, community connections, and people who would refer them if they were given the right reason.',
                  'We will help you see where those opportunities are and which ones are worth acting on first.',
                ],
              },
              {
                icon: Target,
                title: 'What is making follow-up harder than it needs to be',
                paragraphs: [
                  'If your CRM feels overwhelming, your touchpoints are inconsistent, or your business depends on remembering everything manually, we will identify where the friction is coming from.',
                  'The goal is not more busywork. It is a rhythm you can actually keep.',
                ],
              },
              {
                icon: Route,
                title: 'What kind of support makes sense next',
                paragraphs: [
                  'Some agents need a simple system. Some need strategy and accountability. Some need someone to take more of the work off their plate.',
                  'We will help you figure out which path fits your goals, your capacity, and the way you want to run your business.',
                ],
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-7 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <c.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 leading-snug">{c.title}</h3>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  {c.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* What you'll walk away with */}
          <div className="mt-12 max-w-3xl mx-auto bg-card border border-border rounded-xl p-7 md:p-8 shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
              What you'll walk away with
            </h3>
            <ul className="space-y-3 text-muted-foreground leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>A quick look at where your business is and what is creating friction.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>Clarity on the next best move to create more consistent opportunities.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>
                  A recommendation on whether Real Estate on Purpose is the right fit — or what to focus
                  on instead.
                </span>
              </li>
            </ul>
            <p className="mt-5 text-sm text-muted-foreground italic">
              Either way, you leave the call with a clearer next step. No pressure to move forward with us.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THREE PATHS */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              Choose the level of support your business{' '}
              <span className="text-primary">actually needs.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              REOP is built to meet agents where they are. Whether you need a simple way to stay in touch
              or deeper help building a more intentional business, the right path starts with clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                tag: 'Path 1',
                title: 'SphereSync',
                subtitle: 'For agents who need a simple system to stay connected.',
                body:
                  'SphereSync helps you organize your relationships, create consistent follow-up, and stay visible with the people most likely to work with you or refer you.\n\nIt is a good fit if you want a practical way to manage your sphere without overcomplicating your business.',
                bestFor:
                  'Agents who want better consistency with past clients, warm contacts, and referral relationships.',
              },
              {
                icon: HandHeart,
                tag: 'Path 2',
                title: 'Done-With-You Growth Support',
                subtitle: 'For agents who want strategy, structure, and accountability.',
                body:
                  'This is for agents who do not just want a tool. They want help deciding what to focus on, how to build a follow-up rhythm, and how to turn existing relationships into real business opportunities.\n\nWe work with you to create a plan you can actually follow.',
                bestFor:
                  'Agents who feel like they have opportunity but need help turning it into a clear, consistent growth system.',
              },
              {
                icon: Megaphone,
                tag: 'Path 3',
                title: 'Full-Service Business Support',
                subtitle:
                  'For agents who want a partner taking more of the work off their plate.',
                body:
                  'For agents who need deeper execution support across content, marketing, operations, and business growth. This is for agents who want a partner helping them build the machine — not just another tool or one-off campaign.',
                bestFor:
                  'Established agents ready to invest in deeper support so they can focus on the highest-value parts of their business.',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-7 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <p.icon className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-primary font-medium mb-4 leading-snug">{p.subtitle}</p>
                <div className="space-y-3 text-muted-foreground leading-relaxed mb-5 flex-1">
                  {p.body.split('\n\n').map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Best for
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.bestFor}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground max-w-2xl mx-auto mt-10 text-base md:text-lg">
            You do not need to know which path is right before the call.{' '}
            <span className="text-foreground font-medium">
              That is exactly what we'll help you figure out.
            </span>
          </p>
        </div>
      </section>

      {/* 4. ABOUT PAM */}
      <section className="px-6 py-16 md:py-24 bg-secondary/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2">
            <div className="aspect-[4/5] w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-muted shadow-md">
              <img
                src="/images/pam-obryant.jpg"
                alt="Pam O'Bryant — Real Estate on Purpose"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
          <div className="md:col-span-3 space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              Led by people who understand real estate —{' '}
              <span className="text-primary">not just marketing</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Real Estate on Purpose was built to help agents grow with more intention, more consistency,
              and less overwhelm.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pam brings a real-estate-specific perspective to the conversation. She understands that
              agents are not just trying to "get more leads." They are trying to build a business that is
              easier to manage, easier to grow, and more aligned with the life they actually want.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              On the call, the goal is simple: get clear on what is really holding things back and identify
              the next step that makes the most sense.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-10">
            What agents are saying
          </h2>
          <div className="bg-card border border-border rounded-2xl p-10 md:p-12 shadow-sm relative">
            <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/30" />
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed font-light italic">
              "Since I've joined Real Estate on Purpose, I'm the most relaxed I've been in two or three
              months. I know I'm going to hit my goals. In fact, I'm probably going to blow them out of
              the water."
            </blockquote>
            <p className="mt-6 text-muted-foreground font-medium">
              — Jeff P., Realtor · DC Metropolitan Market
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALENDAR BOOKING */}
      <section id="book" className="px-6 py-16 md:py-24 bg-secondary/20 scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
              Book your <span className="text-primary">strategy call</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Choose a time that works for you below. You'll leave the call with a clearer understanding
              of what your business needs next and which path may be the best fit.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border shadow-md bg-card">
            <iframe
              src={BOOKING_EMBED_URL}
              title="Book your strategy call"
              id={BOOKING_EMBED_ID}
              scrolling="no"
              style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '720px' }}
            />
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="px-6 py-16 md:py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Ready to get clear on the right next step?
          </h2>
          <p className="text-lg text-secondary-foreground/85 leading-relaxed">
            If you know your business could be running with more consistency, better follow-up, and clearer
            support, this is the place to start.
          </p>
          <div className="pt-2">
            <Button
              onClick={scrollToBook}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base md:text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              Schedule My Call
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <FooterMinimal />
    </div>
  );
};

export default Call;
