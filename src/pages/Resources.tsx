import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Download, FileText, Video, Calendar, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const resourceIcons: Record<string, any> = {
  pdf: FileText,
  video: Video,
  webinar: Video,
  toolkit: Award,
  scorecard: Award,
  plan: Calendar,
};

const Resources = () => {
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: resources, isLoading } = useQuery({
    queryKey: ["free-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("free_resources")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const handleDownloadClick = (resource: any) => {
    setSelectedResource(resource);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Tools & Resources</h1>
            <p className="text-xl text-muted-foreground">
              Download proven templates, guides, and tools to help you build systems that scale your real estate business
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {resources?.map((resource) => {
                const Icon = resourceIcons[resource.resource_type] || FileText;
                return (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    {resource.thumbnail_url ? (
                      <img
                        src={resource.thumbnail_url}
                        alt={resource.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                        <Icon className="h-16 w-16 text-primary" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="capitalize">
                          {resource.resource_type}
                        </Badge>
                        {resource.download_count > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {resource.download_count} downloads
                          </span>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => handleDownloadClick(resource)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Get This Resource
                      </Button>
                      <Link to={`/resources/${resource.slug}`} className="block">
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lead Capture Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Get Your Free Resource</DialogTitle>
            <DialogDescription>
              Fill out the form below to download {selectedResource?.title}
            </DialogDescription>
          </DialogHeader>
          <LeadCaptureForm 
            resourceId={selectedResource?.id}
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

export default Resources;