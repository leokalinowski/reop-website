import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import FooterMinimal from "@/components/FooterMinimal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, TrendingUp, Users, Zap, Shield, Award, Target } from "lucide-react";
import blueJayLogo from "@/assets/logos/blue-jay-properties.png";
import kwLogo from "@/assets/logos/keller-williams.png";
import reopLogo from "/images/reop-logo-compact.png";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseStates: string[];
  annualTransactions: string;
  yearsExperience: string;
  note: string;
  website: string; // honeypot
}

const LICENSE_STATES = [
  { value: "MD", label: "Maryland (MD)" },
  { value: "DC", label: "Washington D.C." },
  { value: "VA", label: "Virginia (VA)" },
  { value: "Other", label: "Other" },
];

const benefits = [
  {
    icon: Zap,
    title: "Proven, Done-for-You Systems from Real Estate on Purpose™",
    description: "Four integrated divisions — transaction coordination, marketing automation, administrative support, and client experience systems — all built and managed for you. Zero overwhelm.",
  },
  {
    icon: Target,
    title: "Sphere Sync + Proprietary Technology",
    description: "Automated drip campaigns, birthday/housiversary reminders, calendar sync, referral tracking, and relationship intelligence tools — all in one powerful, agent-first platform.",
  },
  {
    icon: TrendingUp,
    title: "Regressive Commission Split That Rewards Independence",
    description: "Starts at a fair 50/50 and improves dramatically the more you produce. The harder you work and the more systems you master, the more you keep. No caps. No hidden fees.",
  },
  {
    icon: Users,
    title: "World-Class Training, Events & Team Support",
    description: "Regular team events, masterminds, skill-building workshops, and market dominance sessions led by Samir Redwan — 20+ years experience, Lead Associate Broker, licensed loan officer.",
  },
  {
    icon: Shield,
    title: "Guaranteed Path to Higher Production",
    description: "Systems designed for agents already closing 3–7 transactions who want to 2x–3x that number while working smarter, not harder. Referral-based model + done-for-you support = predictable growth.",
  },
  {
    icon: Award,
    title: "Elite Leadership & Mentorship",
    description: "Direct access to Samir Redwan's expertise — a proven closer, negotiator, and team builder with a reputation for excellence — plus the full power of a high-performing, collaborative team.",
  },
];

const requirements = [
  "Active real estate license in MD, DC, or VA (or willing to obtain)",
  "Currently producing minimum 3–7 transactions per year",
  "Coachable, driven, and relationship-focused",
  "Ready to leverage systems and technology instead of reinventing the wheel",
  "Commitment to professionalism, ethics, and growth",
];

const JoinBlueJay = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseStates: [],
    annualTransactions: "",
    yearsExperience: "",
    note: "",
    website: "",
  });

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleLicenseState = (state: string) => {
    setFormData((prev) => {
      const states = prev.licenseStates.includes(state)
        ? prev.licenseStates.filter((s) => s !== state)
        : [...prev.licenseStates, state];
      return { ...prev, licenseStates: states };
    });
  };

  const validateForm = (): string | null => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email";
    if (!formData.phone.trim()) return "Phone number is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return;

    const error = validateForm();
    if (error) {
      toast({ title: "Validation Error", description: error, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("submit-agent-application", {
        body: {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          license_states: formData.licenseStates,
          annual_transactions: formData.annualTransactions,
          years_experience: formData.yearsExperience,
          note: formData.note.trim(),
          team_slug: "blue-jay-properties",
        },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      navigate("/join/blue-jay-properties/thank-you");
    } catch (err: any) {
      toast({
        title: "Submission Error",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Join Blue Jay Properties Group | Real Estate Agent Opportunity"
        description="Join Samir Redwan's Blue Jay Properties Group at Keller Williams Capital Properties. Done-for-you systems, mentorship, and a commission split that rewards your growth."
        keywords={["real estate agent", "Keller Williams", "Blue Jay Properties", "Rockville MD", "real estate team", "DMV real estate"]}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-secondary text-secondary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Real Estate Agent Opportunity — Rockville, MD (Serving DMV & Beyond)
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Join Blue Jay Properties Group
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-2">
            Keller Williams Capital Properties
          </p>
          <p className="text-base opacity-75 mb-8">
            Hiring & Onboarding Managed by Real Estate on Purpose™
          </p>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Are you an active, licensed real estate agent currently closing 3–7 transactions per year and ready to scale without the burnout, chaos, or guesswork?
          </p>
          <a href="#apply" className="inline-block mt-8">
            <Button size="lg" className="text-base px-8 py-4">Apply Now</Button>
          </a>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            A Team Built for Real Growth — Not Just Transactions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Samir Redwan's Blue Jay Properties Group at Keller Williams Capital Properties is expanding. We're selectively inviting high-potential agents who want more than a desk and a logo.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Through our partnership with Real Estate on Purpose™, we deliver everything you need to build a thriving, referral-based business that actually feels good to run — while keeping more of your commission as you grow.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Why Top-Producing Agents Are Choosing Blue Jay Properties + Real Estate on Purpose
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We don't just give you a split. We give you a complete success system so you can focus 100% on relationships and closings.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-2 mt-1">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            What You Bring (We're Selective)
          </h2>
          <ul className="space-y-4">
            {requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-lg">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Success */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            What Success Looks Like Here
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Agents on this team don't just survive — they thrive. You'll have the support infrastructure that most solo agents or big-box brokerages never provide, plus the freedom and higher splits that come with proven independence.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            If you're tired of doing it all alone, capping out at 3–7 deals, or feeling overwhelmed by the admin and marketing — this is your opportunity.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Real Estate Career?
            </h2>
            <p className="text-muted-foreground text-lg">
              Apply below. We only bring on a limited number of agents who align with our high standards and growth mindset.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-xl p-6 md:p-8">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => updateField("website", e.target.value)}
              className="absolute opacity-0 pointer-events-none h-0 w-0"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">First Name *</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Last Name *</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="(555) 555-5555"
                  required
                />
              </div>
            </div>

            {/* License States */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">License State(s)</label>
              <div className="flex flex-wrap gap-4">
                {LICENSE_STATES.map((s) => (
                  <label key={s.value} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.licenseStates.includes(s.value)}
                      onCheckedChange={() => toggleLicenseState(s.value)}
                    />
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Current Annual Transactions</label>
                <Select value={formData.annualTransactions} onValueChange={(v) => updateField("annualTransactions", v)}>
                  <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1–2</SelectItem>
                    <SelectItem value="3-5">3–5</SelectItem>
                    <SelectItem value="6-7">6–7</SelectItem>
                    <SelectItem value="8-10">8–10</SelectItem>
                    <SelectItem value="10+">10+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Years of Experience</label>
                <Select value={formData.yearsExperience} onValueChange={(v) => updateField("yearsExperience", v)}>
                  <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1–3 years</SelectItem>
                    <SelectItem value="3-5">3–5 years</SelectItem>
                    <SelectItem value="5-10">5–10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Why do you want to join Blue Jay Properties?</label>
              <Textarea
                value={formData.note}
                onChange={(e) => updateField("note", e.target.value)}
                placeholder="Tell us about your goals and why you're ready to scale with purpose..."
                rows={4}
              />
            </div>

            <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Apply to Join the Team"}
            </Button>
          </form>

          {/* EEO Disclaimer */}
          <p className="text-xs text-muted-foreground mt-8 leading-relaxed text-center">
            Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all agents. All qualified applicants will receive consideration without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or veteran status. This opportunity is compliant with all applicable federal, state, and local fair housing and employment laws.
          </p>
        </div>
      </section>

      <FooterMinimal />
    </div>
  );
};

export default JoinBlueJay;
