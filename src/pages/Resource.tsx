import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Download, ArrowLeft, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const Resource = () => {
  const { slug } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const { data: relatedResources } = useQuery({
    queryKey: ["related-resources", resource?.id],
    queryFn: async () => {
      if (!resource) return [];
      const { data, error } = await supabase
        .from("free_resources")
        .select("*")
        .eq("is_active", true)
        .neq("id", resource.id)
        .order("display_order")
        .limit(3);
      if (error) throw error;
      return data;
    },
    enabled: !!resource,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
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
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Resource Not Found</h1>
          <Link to="/resources">
            <Button>Back to Resources</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/resources" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Link>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Resource Preview */}
              <div>
                {resource.thumbnail_url ? (
                  <img
                    src={resource.thumbnail_url}
                    alt={resource.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                    <Download className="h-24 w-24 text-primary" />
                  </div>
                )}
              </div>

              {/* Resource Info */}
              <div>
                <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{resource.description}</p>
                
                <Button 
                  size="lg" 
                  className="w-full mb-4"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Get This Free Resource
                </Button>

                {resource.download_count > 0 && (
                  <p className="text-sm text-center text-muted-foreground">
                    Downloaded {resource.download_count}+ times
                  </p>
                )}
              </div>
            </div>

            {/* What's Included Section */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Comprehensive guide tailored for real estate agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Ready-to-use templates and worksheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Proven strategies from top-performing agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Step-by-step implementation instructions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Resources */}
      {relatedResources && relatedResources.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">More Free Resources</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedResources.map((related) => (
                <Link key={related.id} to={`/resources/${related.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    {related.thumbnail_url && (
                      <img
                        src={related.thumbnail_url}
                        alt={related.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{related.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{related.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead Capture Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Get Your Free Resource</DialogTitle>
            <DialogDescription>
              Fill out the form below to download {resource.title}
            </DialogDescription>
          </DialogHeader>
          <LeadCaptureForm 
            resourceId={resource.id}
            onSuccess={() => {
              setIsFormOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Resource;