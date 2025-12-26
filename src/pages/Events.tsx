import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  organizer: string | null;
  rsvp_link: string;
  image_url: string | null;
  event_type: string | null;
}

const Events = () => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ["public-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });

  return (
    <>
      <SEO
        title="Events | Real Estate on Purpose"
        description="Join our classes, networking events, and webinars to grow your real estate business with purpose."
      />
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us for classes, networking events, and webinars designed to help you grow your real estate business with purpose.
            </p>
          </div>
        </section>

        {/* Events List */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive">Failed to load events. Please try again later.</p>
              </div>
            ) : events && events.length > 0 ? (
              <div className="grid gap-6 md:gap-8">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      {/* Event Image */}
                      {event.image_url && (
                        <div className="md:w-72 md:flex-shrink-0">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Event Details */}
                      <div className="flex-1">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              {event.event_type && (
                                <Badge variant="secondary" className="mb-2">
                                  {event.event_type}
                                </Badge>
                              )}
                              <CardTitle className="text-xl md:text-2xl">
                                {event.title}
                              </CardTitle>
                            </div>
                          </div>
                          {event.description && (
                            <CardDescription className="text-base mt-2">
                              {event.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        
                        <CardContent>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>
                                {format(new Date(event.event_date), "EEEE, MMMM d, yyyy")}
                              </span>
                            </div>
                            
                            {event.event_time && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{event.event_time}</span>
                              </div>
                            )}
                            
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          
                          <Button asChild>
                            <a
                              href={event.rsvp_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2"
                            >
                              RSVP Now
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Upcoming Events
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Check back soon for upcoming classes, networking events, and webinars.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Events;
