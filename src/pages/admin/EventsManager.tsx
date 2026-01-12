import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminNavigation from "@/components/AdminNavigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { format, isPast } from "date-fns";
import { Calendar, Clock, MapPin, Trash2, Edit, ExternalLink, Loader2, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  organizer: string | null;
  rsvp_link: string;
  hub_url: string;
  image_url: string | null;
  event_type: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface EventFormData {
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  organizer: string;
  rsvp_link: string;
  hub_url: string;
  image_url: string;
  event_type: string;
  is_active: boolean;
}

const initialFormData: EventFormData = {
  title: "",
  description: "",
  event_date: "",
  event_time: "",
  location: "",
  organizer: "Pam O'Bryant",
  rsvp_link: "",
  hub_url: "",
  image_url: "",
  event_type: "Public Event",
  is_active: true,
};

const EventsManager = () => {
  const queryClient = useQueryClient();
  const [hubUrl, setHubUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch all events (admins can see all)
  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });

  // Detect URL source and call appropriate scraper
  const detectUrlSource = (url: string): "hub" | "eventbrite" | null => {
    const trimmed = url.trim().toLowerCase();
    if (trimmed.includes("hub.realestateonpurpose.com")) return "hub";
    if (trimmed.includes("eventbrite.com")) return "eventbrite";
    return null;
  };

  // Import from URL (supports Hub and Eventbrite)
  const handleImportFromUrl = async () => {
    if (!hubUrl.trim()) {
      toast.error("Please enter an event URL");
      return;
    }

    const source = detectUrlSource(hubUrl);
    if (!source) {
      toast.error("Unsupported URL. Please use a Hub or Eventbrite event link.");
      return;
    }

    setIsImporting(true);
    try {
      const functionName = source === "hub" ? "scrape-hub-event" : "scrape-eventbrite";
      
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { url: hubUrl },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || "Failed to import event");

      const scraped = data.data;
      
      // Convert ISO date to input format (YYYY-MM-DD)
      let dateValue = "";
      if (scraped.event_date) {
        const date = new Date(scraped.event_date);
        if (!isNaN(date.getTime())) {
          dateValue = format(date, "yyyy-MM-dd");
        }
      }

      // For Eventbrite, use the scraped rsvp_link if available, otherwise the input URL
      const rsvpLink = scraped.rsvp_link || hubUrl;

      setFormData({
        title: scraped.title || "",
        description: scraped.description || "",
        event_date: dateValue,
        event_time: scraped.event_time || "",
        location: scraped.location || "",
        organizer: scraped.organizer || "Pam O'Bryant",
        rsvp_link: rsvpLink,
        hub_url: hubUrl, // Store original URL for reference
        image_url: scraped.image_url || "",
        event_type: scraped.event_type || "Public Event",
        is_active: true,
      });

      setIsDialogOpen(true);
      toast.success(`Event imported from ${source === "hub" ? "Hub" : "Eventbrite"}! Please review and save.`);
    } catch (error) {
      console.error("Import error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to import event");
    } finally {
      setIsImporting(false);
    }
  };

  // Save event mutation
  const saveMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      // Validate required fields
      if (!data.title.trim()) throw new Error("Title is required");
      if (!data.event_date) throw new Error("Event date is required");
      if (!data.rsvp_link.trim()) throw new Error("RSVP link is required");
      if (!data.hub_url.trim()) throw new Error("Hub URL is required");

      const eventPayload = {
        title: data.title.trim(),
        description: data.description.trim() || null,
        event_date: new Date(data.event_date).toISOString(),
        event_time: data.event_time.trim() || null,
        location: data.location.trim() || null,
        organizer: data.organizer.trim() || "Pam O'Bryant",
        rsvp_link: data.rsvp_link.trim(),
        hub_url: data.hub_url.trim(),
        image_url: data.image_url.trim() || null,
        event_type: data.event_type.trim() || "Public Event",
        is_active: data.is_active,
      };

      if (isEditing && editingId) {
        const { error } = await supabase
          .from("events")
          .update(eventPayload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert(eventPayload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success(isEditing ? "Event updated!" : "Event created!");
      resetForm();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to save event");
    },
  });

  // Delete event mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Event deleted!");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to delete event");
    },
  });

  // Toggle active status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("events")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
    },
    onError: () => {
      toast.error("Failed to update event status");
    },
  });

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description || "",
      event_date: format(new Date(event.event_date), "yyyy-MM-dd"),
      event_time: event.event_time || "",
      location: event.location || "",
      organizer: event.organizer || "Pam O'Bryant",
      rsvp_link: event.rsvp_link,
      hub_url: event.hub_url,
      image_url: event.image_url || "",
      event_type: event.event_type || "Public Event",
      is_active: event.is_active,
    });
    setIsEditing(true);
    setEditingId(event.id);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setEditingId(null);
    setIsDialogOpen(false);
    setHubUrl("");
  };

  const handleFormChange = (field: keyof EventFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ProtectedRoute>
      <AdminNavigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Events Manager</h1>
          <p className="text-muted-foreground">
            Manage events by importing from Hub URLs or creating manually.
          </p>
        </div>

        {/* Import Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Import Event from URL
            </CardTitle>
            <CardDescription>
              Paste an event URL from Hub or Eventbrite to automatically import event details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="https://hub.realestateonpurpose.com/... or https://eventbrite.com/..."
                value={hubUrl}
                onChange={(e) => setHubUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleImportFromUrl} disabled={isImporting}>
                {isImporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  "Import"
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Supported platforms: Hub (hub.realestateonpurpose.com), Eventbrite (eventbrite.com)
            </p>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>
              {events?.length || 0} events total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : events && events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event) => {
                  const eventIsPast = isPast(new Date(event.event_date));
                  return (
                    <div
                      key={event.id}
                      className={`p-4 border rounded-lg ${
                        eventIsPast ? "bg-muted/50 opacity-75" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            {event.event_type && (
                              <Badge variant="secondary">{event.event_type}</Badge>
                            )}
                            {eventIsPast && (
                              <Badge variant="outline" className="text-muted-foreground">
                                Past
                              </Badge>
                            )}
                            {!event.is_active && (
                              <Badge variant="destructive">Inactive</Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(event.event_date), "MMM d, yyyy")}
                            </span>
                            {event.event_time && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.event_time}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`active-${event.id}`} className="text-sm">
                              Active
                            </Label>
                            <Switch
                              id={`active-${event.id}`}
                              checked={event.is_active}
                              onCheckedChange={(checked) =>
                                toggleActiveMutation.mutate({ id: event.id, is_active: checked })
                              }
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(event.hub_url, "_blank")}
                            title="View on Hub"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(event)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(event.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No events yet. Import one from Hub or Eventbrite to get started.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Event Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => !open && resetForm()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Event" : "Add Event"}</DialogTitle>
              <DialogDescription>
                Review and edit the event details before saving.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  placeholder="Event title"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  placeholder="Event description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="event_date">Date *</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => handleFormChange("event_date", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event_time">Time</Label>
                  <Input
                    id="event_time"
                    value={formData.event_time}
                    onChange={(e) => handleFormChange("event_time", e.target.value)}
                    placeholder="e.g., 9:00 AM - 10:00 AM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                    placeholder="Virtual or physical location"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event_type">Event Type</Label>
                  <Input
                    id="event_type"
                    value={formData.event_type}
                    onChange={(e) => handleFormChange("event_type", e.target.value)}
                    placeholder="e.g., Public Event, Webinar"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rsvp_link">RSVP Link *</Label>
                <Input
                  id="rsvp_link"
                  value={formData.rsvp_link}
                  onChange={(e) => handleFormChange("rsvp_link", e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hub_url">Hub URL *</Label>
                <Input
                  id="hub_url"
                  value={formData.hub_url}
                  onChange={(e) => handleFormChange("hub_url", e.target.value)}
                  placeholder="https://hub.realestateonpurpose.com/event/..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleFormChange("image_url", e.target.value)}
                  placeholder="https://..."
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full max-h-40 object-cover rounded-md mt-2"
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleFormChange("is_active", checked)}
                />
                <Label htmlFor="is_active">Active (visible to public)</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                onClick={() => saveMutation.mutate(formData)}
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? (
                  "Update Event"
                ) : (
                  "Save Event"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Event</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this event? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && deleteMutation.mutate(deleteId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </ProtectedRoute>
  );
};

export default EventsManager;
