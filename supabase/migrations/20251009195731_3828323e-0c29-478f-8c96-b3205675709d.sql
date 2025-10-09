-- Update the RLS policy to explicitly check for service role
-- This ensures only the Edge Function (running as service role) can insert leads

-- Drop the existing policy
DROP POLICY IF EXISTS "Only service role can insert leads" ON public.leads;

-- Create a more restrictive policy that checks the auth role
CREATE POLICY "Only service role can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Add a comment explaining the security measure
COMMENT ON POLICY "Only service role can insert leads" ON public.leads IS 
'Leads can only be inserted via the submit-lead Edge Function which runs as service_role. This includes rate limiting, honeypot detection, and input validation to prevent spam bots.';
