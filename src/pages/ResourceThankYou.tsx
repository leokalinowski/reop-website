import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Download, CheckCircle, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ResourceThankYou = () => {
  const [searchParams] = useSearchParams();
  const resourceId = searchParams.get("resourceId");
  const downloadUrl = searchParams.get("downloadUrl");

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

  useEffect(() => {
    // Auto-download on page load
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = resource?.title || "resource";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [downloadUrl, resource]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Thank You!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your download should start automatically. If it doesn't, click the button below.
            </p>

            {/* Download Button */}
            {downloadUrl && (
              <a href={downloadUrl} download>
                <Button size="lg" className="mb-12">
                  <Download className="h-5 w-5 mr-2" />
                  Download {resource?.title}
                </Button>
              </a>
            )}

            {/* What's Next Section */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <Calendar className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Schedule Your Strategy Session</CardTitle>
                  <CardDescription>
                    Ready to take your business to the next level? Book a free strategy session with Pam O'Bryant.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/jump-start">
                    <Button variant="outline" className="w-full">
                      Book Your Call
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Download className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Explore More Resources</CardTitle>
                  <CardDescription>
                    Discover more free tools, templates, and guides to help grow your business.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/resources">
                    <Button variant="outline" className="w-full">
                      View All Resources
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Email Confirmation */}
            <p className="mt-12 text-sm text-muted-foreground">
              We've also sent a download link to your email, along with some bonus tips to help you get the most out of this resource.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResourceThankYou;