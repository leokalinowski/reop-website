import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import Logo from '@/components/Logo';
import FooterMinimal from '@/components/FooterMinimal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  audienceSize: string;
  realEstateExperience: string;
  promotionPlan: string;
  website: string; // honeypot
}

const AffiliateApply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    audienceSize: '',
    realEstateExperience: '',
    promotionPlan: '',
    website: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): string | null => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email';
    if (!formData.audienceSize) return 'Please select your audience size';
    if (!formData.realEstateExperience) return 'Please select your experience level';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) return;

    const error = validateForm();
    if (error) {
      toast({ title: 'Missing Information', description: error, variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('submit-affiliate', {
        body: {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || null,
          instagram: formData.instagram.trim() || null,
          youtube: formData.youtube.trim() || null,
          tiktok: formData.tiktok.trim() || null,
          audience_size: formData.audienceSize,
          real_estate_experience: formData.realEstateExperience,
          promotion_plan: formData.promotionPlan.trim() || null,
        },
      });

      if (fnError) throw fnError;

      navigate('/affiliate/thank-you');
    } catch (err: any) {
      toast({
        title: 'Submission Error',
        description: err?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-[#0AADAD] focus:ring-[#0AADAD]/20";

  return (
    <div className="min-h-screen bg-[#0E1E2B] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <SEO
        title="Apply — SphereSync Affiliate Program"
        description="Apply to become a SphereSync affiliate. Earn 20% commission on every referral."
      />

      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center max-w-3xl mx-auto">
        <Logo />
        <Link to="/affiliate" className="text-sm text-[#9AAAB8] hover:text-[#0AADAD] flex items-center gap-1 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </header>

      {/* Form */}
      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light mb-2 text-center" style={{ fontFamily: "'Lora', serif" }}>
            Affiliate Application
          </h1>
          <p className="text-center text-[#9AAAB8] font-light mb-10">
            Tell us about yourself so we can set you up for success.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={e => updateField('website', e.target.value)}
              />
            </div>

            {/* Name */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">First Name *</Label>
                <Input className={inputClasses} placeholder="Jane" value={formData.firstName} onChange={e => updateField('firstName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Last Name *</Label>
                <Input className={inputClasses} placeholder="Smith" value={formData.lastName} onChange={e => updateField('lastName', e.target.value)} />
              </div>
            </div>

            {/* Contact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">Email *</Label>
                <Input type="email" className={inputClasses} placeholder="jane@example.com" value={formData.email} onChange={e => updateField('email', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Phone</Label>
                <Input type="tel" className={inputClasses} placeholder="(555) 123-4567" value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
              </div>
            </div>

            {/* Social */}
            <div>
              <Label className="text-white/80 text-sm mb-3 block">Social Media (optional)</Label>
              <div className="grid sm:grid-cols-3 gap-4">
                <Input className={inputClasses} placeholder="@instagram" value={formData.instagram} onChange={e => updateField('instagram', e.target.value)} />
                <Input className={inputClasses} placeholder="YouTube channel" value={formData.youtube} onChange={e => updateField('youtube', e.target.value)} />
                <Input className={inputClasses} placeholder="@tiktok" value={formData.tiktok} onChange={e => updateField('tiktok', e.target.value)} />
              </div>
            </div>

            {/* Selects */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/80">Audience Size *</Label>
                <Select value={formData.audienceSize} onValueChange={v => updateField('audienceSize', v)}>
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1K">Less than 1,000</SelectItem>
                    <SelectItem value="1-5K">1,000 – 5,000</SelectItem>
                    <SelectItem value="5-25K">5,000 – 25,000</SelectItem>
                    <SelectItem value="25K+">25,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Real Estate Experience *</Label>
                <Select value={formData.realEstateExperience} onValueChange={v => updateField('realEstateExperience', v)}>
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No real estate experience</SelectItem>
                    <SelectItem value="1-3years">1–3 years</SelectItem>
                    <SelectItem value="3-5years">3–5 years</SelectItem>
                    <SelectItem value="5+years">5+ years</SelectItem>
                    <SelectItem value="coach-trainer">Coach / Trainer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Promotion Plan */}
            <div className="space-y-2">
              <Label className="text-white/80">How do you plan to promote SphereSync?</Label>
              <Textarea
                className={`${inputClasses} min-h-[100px]`}
                placeholder="e.g. Email list, Instagram stories, podcast, YouTube reviews..."
                value={formData.promotionPlan}
                onChange={e => updateField('promotionPlan', e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0B8F8F] hover:bg-[#0AADAD] text-white py-4 rounded font-medium text-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(11,143,143,0.28)] disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>

      <FooterMinimal />
    </div>
  );
};

export default AffiliateApply;
