import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  Download, 
  CheckCircle, 
  Clock, 
  Shield, 
  ArrowRight,
  Quote,
  ChevronDown,
  ChevronUp,
  Users
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ResourceLandingHeader from "@/components/ResourceLandingHeader";
import ResourceLandingFooter from "@/components/ResourceLandingFooter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import pamImage from "@/assets/images/pamobryant.png";
import { getResourceContent, getBenefitIconsForSlug, getThumbnailForSlug } from "@/config/resourceContent";


const Resource = () => {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { data: resource, isLoading } = useQuery({
    queryKey: ["resource", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("free_resources")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get resource-specific content
  const resourceContent = getResourceContent(slug || "");
  const benefitIcons = getBenefitIconsForSlug(slug || "");
  const fallbackThumbnail = getThumbnailForSlug(slug || "");

  // Use database thumbnail or fallback to config
  const thumbnailUrl = resource?.thumbnail_url || fallbackThumbnail;

  const withCacheBust = (url: string | null | undefined, version: string | null | undefined) => {
    if (!url || !version) return url ?? null;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}v=${encodeURIComponent(version)}`;
  };

  const thumbnailSrc = withCacheBust(thumbnailUrl, resource?.updated_at ?? resource?.created_at);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ResourceLandingHeader />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <ResourceLandingHeader />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Resource Not Found</h1>
          <p className="text-muted-foreground mb-8">The resource you're looking for doesn't exist or has been removed.</p>
        </div>
        <ResourceLandingFooter />
      </div>
    );
  }

  const faqItems = resourceContent.faqs;
  const benefits = resourceContent.benefits;

  return (
    <div className="min-h-screen bg-background">
      <ResourceLandingHeader />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Copy */}
              <div className="space-y-8">
                {/* Social proof badge */}
                {resource.download_count > 10 && (
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                    <Users className="h-4 w-4" />
                    <span>Downloaded by {resource.download_count}+ agents</span>
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {resource.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {resource.description}
                </p>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>No Spam, Ever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Instant Download</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto group"
                  onClick={scrollToForm}
                >
                  Get Your Free Copy Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Right - Resource Image */}
              <div className="relative">
                <div className="relative z-10">
                  {thumbnailSrc ? (
                    <img
                      src={thumbnailSrc}
                      alt={resource.title}
                      className="w-full max-w-md mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full max-w-md mx-auto aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg shadow-2xl flex items-center justify-center">
                      <Download className="h-24 w-24 text-primary" />
                    </div>
                  )}
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Agitation Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Sound Familiar?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {resourceContent.painPoints.map((pain, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border/50">
                  <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-destructive text-sm font-bold">!</span>
                  </div>
                  <p className="text-foreground">{pain}</p>
                </div>
              ))}
            </div>
            <p className="text-xl text-muted-foreground pt-4">
              <strong className="text-foreground">You're not alone.</strong> Most agents feel exactly this way. 
              The good news? There's a better way—and this free resource shows you how.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You'll Discover Inside
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                This isn't just another PDF that collects dust. It's your roadmap to a more profitable, balanced real estate career.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefitIcons[index];
                return (
                  <div 
                    key={index}
                    className="p-6 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>

            {/* What's Included List */}
            <div className="mt-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-8 text-center">Here's Exactly What's Included:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resourceContent.whatsIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials Section */}
      <section className="py-16 md:py-20 bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-secondary/10 to-primary/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real Agents. Real Results.
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hear from agents who transformed their businesses with our proven strategies.
              </p>
            </div>

            {/* Video Testimonials */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center space-y-4">
                <div className="w-full aspect-video rounded-xl shadow-lg overflow-hidden bg-muted">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/v9CbYlbrXOo"
                    title="Video testimonial from Aminda Kadir"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="text-lg font-medium text-foreground">Aminda Kadir</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-full aspect-video rounded-xl shadow-lg overflow-hidden bg-muted">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/0akPYBucSLg"
                    title="Video testimonial from Jeff Pennington"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="text-lg font-medium text-foreground">Jeff Pennington</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { stat: "500+", label: "Agents Coached" },
                { stat: "25+", label: "Years Experience" },
                { stat: "4.9/5", label: "Average Rating" },
                { stat: "$10M+", label: "Client Revenue" }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-xl">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{item.stat}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Pam Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              {/* Image */}
              <div className="md:col-span-2">
                <div className="relative">
                  <img 
                    src={pamImage}
                    alt="Pam O'Bryant - Founder of Real Estate On Purpose"
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-xl"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                    25+ Years Experience
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-3 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Meet Pam O'Bryant
                </h2>
                <p className="text-lg text-muted-foreground">
                  Pam O'Bryant is the founder of Real Estate On Purpose and has spent over 25 years helping real estate agents build thriving, sustainable businesses without sacrificing their personal lives.
                </p>
                <p className="text-lg text-muted-foreground">
                  After coaching hundreds of agents from overwhelmed and overworked to organized and in control, she created this resource to share the exact strategies that work.
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Quote className="h-5 w-5" />
                  <span className="italic">"I believe every agent deserves to love their business again."</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-background rounded-xl border border-border/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Form */}
      <section ref={formRef} className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-muted-foreground">
                Get instant access to <strong className="text-foreground">{resource.title}</strong> and start implementing today.
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-8 md:p-12">
              <LeadCaptureForm 
                resourceId={resource.id}
                onSuccess={() => {
                  // Form handles redirect
                }}
              />

              {/* Trust Statement */}
              <div className="mt-8 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Your information is 100% secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No spam, unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResourceLandingFooter />
    </div>
  );
};

export default Resource;