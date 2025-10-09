-- Update the RLS policy for leads table to restrict direct inserts
-- Only allow inserts through the secure Edge Function (using service role)

-- Drop the existing permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Create a new restrictive INSERT policy
-- This will only allow service role (Edge Function) to insert
CREATE POLICY "Only service role can insert leads"
ON public.leads
FOR INSERT
TO service_role
WITH CHECK (true);

-- Add a comment explaining the security measure
COMMENT ON POLICY "Only service role can insert leads" ON public.leads IS 
'Leads can only be inserted via the submit-lead Edge Function which includes rate limiting, honeypot detection, and input validation to prevent spam bots.';
