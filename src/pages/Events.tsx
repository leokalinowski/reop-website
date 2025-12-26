import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Calendar, MapPin, Clock, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const formatDescription = (description: string) => {
  // Split by common bullet patterns and newlines
  const lines = description.split(/\n|(?=•)|(?=-\s)/);
  
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return null;
    
    // Check if it's a bullet point
    const isBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-');
    const content = isBullet ? trimmedLine.slice(1).trim() : trimmedLine;
    
    if (isBullet) {
      return (
        <li key={index} className="ml-4 text-muted-foreground">
          {content}
        </li>
      );
    }
    
    return (
      <p key={index} className="text-muted-foreground">
        {content}
      </p>
    );
  }).filter(Boolean);
};

const EventCard = ({ event }: { event: Event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const eventDate = new Date(event.event_date);
  const day = format(eventDate, "d");
  const month = format(eventDate, "MMM");
  const dayOfWeek = format(eventDate, "EEE");
  
  const descriptionLength = event.description?.length || 0;
  const shouldTruncate = descriptionLength > 150;
  const truncatedDescription = shouldTruncate && !isExpanded 
    ? event.description?.slice(0, 150) + "..." 
    : event.description;

  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Date Badge - Left Side */}
        <div className="flex-shrink-0 bg-primary/5 p-6 flex md:flex-col items-center justify-center gap-2 md:gap-1 md:w-28">
          <div className="text-center">
            <span className="text-xs font-medium text-primary uppercase tracking-wide">{dayOfWeek}</span>
            <div className="text-4xl font-bold text-foreground">{day}</div>
            <span className="text-sm font-medium text-muted-foreground uppercase">{month}</span>
          </div>
        </div>

        {/* Event Image */}
        {event.image_url && (
          <div className="md:w-56 flex-shrink-0 overflow-hidden">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-40 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* Event Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              {event.event_type && (
                <Badge variant="secondary" className="mb-2 text-xs">
                  {event.event_type}
                </Badge>
              )}
              <h2 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            {event.event_time && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary/70" />
                <span>{event.event_time}</span>
              </div>
            )}
            
            {event.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary/70" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className="flex-1 mb-4">
              <div className="space-y-2 text-sm leading-relaxed">
                {isExpanded ? (
                  <ul className="space-y-1.5 list-disc list-outside">
                    {formatDescription(event.description)}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{truncatedDescription}</p>
                )}
              </div>
              
              {shouldTruncate && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                  {isExpanded ? (
                    <>Show less <ChevronUp className="h-4 w-4" /></>
                  ) : (
                    <>Show more <ChevronDown className="h-4 w-4" /></>
                  )}
                </button>
              )}
            </div>
          )}

          {/* RSVP Button */}
          <div className="mt-auto pt-2">
            <Button asChild size="lg" className="w-full md:w-auto">
              <a
                href={event.rsvp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                RSVP Now
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

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
          <div className="container mx-auto px-4 max-w-5xl">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive">Failed to load events. Please try again later.</p>
              </div>
            ) : events && events.length > 0 ? (
              <div className="space-y-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
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
