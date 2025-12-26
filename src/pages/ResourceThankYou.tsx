import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Download, CheckCircle, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ResourceLandingHeader from "@/components/ResourceLandingHeader";
import ResourceLandingFooter from "@/components/ResourceLandingFooter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BOOKING_URL = "https://lp.realestateonpurpose.com/appointmentwithreop";

const ResourceThankYou = () => {
  const [searchParams] = useSearchParams();
  const resourceId = searchParams.get("resourceId");
  const downloadUrl = searchParams.get("downloadUrl");
  const [countdown, setCountdown] = useState(5);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const { data: resource } = useQuery({
    queryKey: ["resource-download", resourceId],
    queryFn: async () => {
      if (!resourceId) return null;
      const { data, error } = await supabase
        .from("free_resources")
        .select("*")
        .eq("id", resourceId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!resourceId,
  });

  // Auto-download on page load
  useEffect(() => {
    if (downloadUrl && !hasDownloaded) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = resource?.title || "resource";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setHasDownloaded(true);
    }
  }, [downloadUrl, resource, hasDownloaded]);

  // Countdown and redirect to booking page
  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = BOOKING_URL;
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const progressPercent = ((5 - countdown) / 5) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ResourceLandingHeader />
      
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Thank You!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            Your download of <strong className="text-foreground">{resource?.title || "your resource"}</strong> should start automatically.
          </p>

          {/* Manual Download Button */}
          {downloadUrl && (
            <a href={downloadUrl} download className="inline-block mb-8">
              <Button variant="outline" size="lg">
                <Download className="h-5 w-5 mr-2" />
                Click here if download didn't start
              </Button>
            </a>
          )}

          {/* Redirect Notice */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-10 border border-border/50">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="h-8 w-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">
                One More Thing...
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-6">
              Want to accelerate your results? <strong className="text-foreground">Book a free strategy session</strong> with Pam O'Bryant and get personalized guidance for your real estate business.
            </p>

            {/* Countdown */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Redirecting you to book your free call in...
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="text-5xl font-bold text-primary tabular-nums">
                  {countdown}
                </div>
                <div className="text-sm text-muted-foreground text-left">
                  second{countdown !== 1 ? "s" : ""}
                </div>
              </div>
              <Progress value={progressPercent} className="mt-4 h-2" />
            </div>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto group"
              onClick={() => window.location.href = BOOKING_URL}
            >
              Book Your Free Strategy Session Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              No obligation • 100% Free • 30-minute call
            </p>
          </div>

          {/* Email Confirmation */}
          <p className="mt-8 text-sm text-muted-foreground">
            We've also sent a download link to your email, along with some bonus tips to help you get the most out of this resource.
          </p>
        </div>
      </div>

      <ResourceLandingFooter />
    </div>
  );
};

export default ResourceThankYou;