-- Create events table for storing event information from Hub
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_time TEXT,
  location TEXT,
  organizer TEXT DEFAULT 'Pam O''Bryant',
  rsvp_link TEXT NOT NULL,
  hub_url TEXT NOT NULL,
  image_url TEXT,
  event_type TEXT DEFAULT 'Public Event',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing of upcoming active events
CREATE POLICY "Anyone can view upcoming active events"
ON public.events
FOR SELECT
USING (is_active = true AND event_date >= now());

-- Create policy for admins to view all events
CREATE POLICY "Admins can view all events"
ON public.events
FOR SELECT
USING (is_admin());

-- Create policy for admins to insert events
CREATE POLICY "Admins can insert events"
ON public.events
FOR INSERT
WITH CHECK (is_admin());

-- Create policy for admins to update events
CREATE POLICY "Admins can update events"
ON public.events
FOR UPDATE
USING (is_admin());

-- Create policy for admins to delete events
CREATE POLICY "Admins can delete events"
ON public.events
FOR DELETE
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();