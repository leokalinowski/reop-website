-- Fix critical security issue: Remove overly permissive RLS policy
-- and implement proper authentication-based access control

-- Drop the current overly permissive policy that allows anyone to read leads
DROP POLICY IF EXISTS "Admin can view all leads" ON public.leads;

-- Create a proper authentication-based policy that only allows authenticated users
-- to view leads (this assumes you'll implement authentication for admin access)
CREATE POLICY "Authenticated users can view leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (true);

-- Keep the existing policy for anonymous lead creation (this is correct for lead capture)
-- The "Anyone can create leads" policy remains unchanged as it's needed for the lead capture form

-- Add a policy for authenticated users to update leads (for admin management)
CREATE POLICY "Authenticated users can update leads" 
ON public.leads 
FOR UPDATE 
TO authenticated
USING (true);

-- Add a policy for authenticated users to delete leads (for admin management)
CREATE POLICY "Authenticated users can delete leads" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (true);