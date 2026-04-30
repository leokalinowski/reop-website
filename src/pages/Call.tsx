import { useEffect } from 'react';
import { Compass, Target, Route, Users, HandHeart, Megaphone, ArrowRight, Quote } from 'lucide-react';
import Logo from '@/components/Logo';
import FooterMinimal from '@/components/FooterMinimal';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';

// Paste your booking link here (Calendly, SavvyCal, etc.). Leave empty to show placeholder.
const CALENDLY_URL = '';

const scrollToBook = () => {
  const el = document.getElementById('book');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Call = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Book a Strategy Call — Real Estate on Purpose"
        description="Book a strategy call with Real Estate on Purpose. We'll help you identify the next best step for your real estate business — better follow-up, guided growth, or full-service marketing support."
      />

      {/* Top bar — logo only */}
      <div className="w-full pt-8 pb-2 px-4 flex justify-center">
        <Logo />
      </div>

      {/* 1. HERO */}
      <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-[#e6f7f8] via-background to-background">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block text-xs md:text-sm font-medium tracking-wider uppercase text-[#005d6c] bg-white/70 border border-[#00a2ad]/20 rounded-full px-4 py-1.5">
            Strategy Call · Real Estate on Purpose
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
            Find the right path to grow your real estate business —{' '}
            <span className="text-[#00a2ad]">without guessing what to do next.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Book a strategy call with Real Estate on Purpose and we'll help you identify what your business
            actually needs next: better follow-up systems, guided growth support, or full-service marketing
            and business support.
          </p>
          <div className="pt-4">
            <Button
              onClick={scrollToBook}
              size="lg"
              className="bg-[#00a2ad] hover:bg-[#005d6c] text-white text-base md:text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#00a2ad]/20"
            >
              Book Your Strategy Call
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto pt-2">
            No pressure. No overwhelm. Just a clear conversation about where you are, where you want to go,
            and what path makes the most sense.
          </p>
        </div>
      </section>

      {/* 2. WHAT WE'LL COVER */}
      <section className="px-6 py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              What we'll figure out together
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              This call is designed to give you clarity, not another pile of random advice. We'll walk through
              where your business is now, what is creating the biggest bottleneck, and which path gives you
              the highest-leverage next step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                title: 'Your Current State',
                body:
                  "We'll look at where your business is today: your lead sources, follow-up process, client relationships, content, and current systems.",
              },
              {
                icon: Target,
                title: 'Your Biggest Opportunity',
                body:
                  "We'll identify the area most likely to create growth right now — whether that is database follow-up, visibility, conversion, retention, or operational support.",
              },
              {
                icon: Route,
                title: 'Your Best-Fit Path',
                body:
                  "We'll help you determine which Real Estate on Purpose path fits best: SphereSync, Done-With-You Growth Support, or Full-Service Marketing & Business Support.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e6f7f8] flex items-center justify-center mb-5">
                  <c.icon className="h-6 w-6 text-[#005d6c]" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-slate-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THREE PATHS */}
      <section className="px-6 py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Three ways we help agents grow with more clarity and consistency
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                tag: 'Path 1',
                title: 'SphereSync',
                body:
                  'For agents who want a smarter way to stay in touch with their sphere, past clients, and warm relationships. SphereSync helps you turn your database into a consistent relationship engine — so fewer opportunities slip through the cracks.',
              },
              {
                icon: HandHeart,
                tag: 'Path 2',
                title: 'Done-With-You Growth Support',
                body:
                  'For agents who want guidance, accountability, and support implementing the right systems without doing everything alone. We help you clarify your strategy, improve follow-up, and create a practical growth rhythm you can actually maintain.',
              },
              {
                icon: Megaphone,
                tag: 'Path 3',
                title: 'Full-Service Marketing & Business Support',
                body:
                  'For agents who need deeper execution support across content, marketing, operations, and business growth. This is for agents who want a partner helping them build the machine — not just another tool or one-off campaign.',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-lg hover:border-[#00a2ad]/40 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#005d6c] flex items-center justify-center">
                    <p.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#00a2ad]">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-700 max-w-2xl mx-auto mt-10 text-base md:text-lg">
            You do not need to know which path is right before the call.{' '}
            <span className="text-[#005d6c] font-medium">
              That is exactly what we'll help you figure out.
            </span>
          </p>
        </div>
      </section>

      {/* 4. ABOUT PAM */}
      <section className="px-6 py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2">
            <div className="aspect-[4/5] w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-slate-100 shadow-md">
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
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Led by people who understand real estate — not just marketing
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Real Estate on Purpose was built to help agents grow with more intention, more consistency,
              and less overwhelm.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Pam brings a real-estate-specific perspective to the conversation. She understands that
              agents are not just trying to "get more leads." They are trying to build a business that is
              easier to manage, easier to grow, and more aligned with the life they actually want.
            </p>
            <p className="text-slate-700 leading-relaxed">
              On the call, the goal is simple: get clear on what is really holding things back and identify
              the next step that makes the most sense.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL */}
      <section className="px-6 py-16 md:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-10">
            What agents are saying
          </h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-10 md:p-12 shadow-sm relative">
            <Quote className="absolute top-6 left-6 h-8 w-8 text-[#00a2ad]/30" />
            <blockquote className="text-xl md:text-2xl text-slate-800 leading-relaxed font-light italic">
              "[Insert strongest testimonial pull quote here.]"
            </blockquote>
            <p className="mt-6 text-slate-500 font-medium">
              — [Agent Name], [Market/Role]
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALENDAR BOOKING */}
      <section id="book" className="px-6 py-16 md:py-20 bg-background scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Book your strategy call
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Choose a time that works for you below. You'll leave the call with a clearer understanding
              of what your business needs next and which path may be the best fit.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
            {CALENDLY_URL ? (
              <iframe
                src={CALENDLY_URL}
                title="Book your strategy call"
                className="w-full"
                style={{ minHeight: '720px', border: 0 }}
                loading="lazy"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12 md:p-20 min-h-[480px] bg-gradient-to-br from-slate-50 to-[#e6f7f8]">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                  <Compass className="h-7 w-7 text-[#00a2ad]" />
                </div>
                <p className="text-slate-700 font-medium text-lg">
                  Embedded booking calendar goes here.
                </p>
                <p className="text-slate-500 mt-2 text-sm max-w-md">
                  Paste your Calendly (or SavvyCal) link into the <code className="bg-white px-1.5 py-0.5 rounded border text-[#005d6c]">CALENDLY_URL</code> constant at the top of <code className="bg-white px-1.5 py-0.5 rounded border text-[#005d6c]">src/pages/Call.tsx</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="px-6 py-16 md:py-20 bg-[#005d6c] text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Ready to get clear on the right next step?
          </h2>
          <p className="text-lg text-white/85 leading-relaxed">
            If you know your business could be running with more consistency, better follow-up, and clearer
            support, this is the place to start.
          </p>
          <div className="pt-2">
            <Button
              onClick={scrollToBook}
              size="lg"
              className="bg-[#99ca3c] hover:bg-[#7fae2e] text-slate-900 text-base md:text-lg px-8 py-6 rounded-xl shadow-lg"
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
