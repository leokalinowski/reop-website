-- Create leads table for storing form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  experience_level TEXT CHECK (experience_level IN ('new', 'experienced', 'veteran')),
  current_brokerage TEXT,
  annual_transactions INTEGER DEFAULT 0,
  target_income INTEGER,
  preferred_markets TEXT[],
  business_objectives TEXT,
  start_timeline TEXT CHECK (start_timeline IN ('immediately', 'within_month', 'within_quarter', 'within_year')),
  communication_preferences TEXT[] DEFAULT ARRAY['email'],
  pdf_generated BOOLEAN DEFAULT FALSE,
  pdf_sent BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (since this is a lead generation form)
CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin access (you'll need authentication later)
CREATE POLICY "Admin can view all leads" 
ON public.leads 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();