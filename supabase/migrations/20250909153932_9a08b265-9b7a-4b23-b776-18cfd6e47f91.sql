-- Add new fields to the leads table for enhanced form data
ALTER TABLE public.leads 
ADD COLUMN sphere_size integer,
ADD COLUMN weekly_hours integer,
ADD COLUMN sphere_contact_frequency text,
ADD COLUMN budget_management_style text,
ADD COLUMN business_stress_level text,
ADD COLUMN biggest_challenge text;