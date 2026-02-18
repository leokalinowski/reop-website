-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Service role can insert downloads" ON public.resource_downloads;

-- Create a properly scoped INSERT policy restricted to service_role with validation
CREATE POLICY "Service role can insert downloads"
ON public.resource_downloads FOR INSERT
TO service_role
WITH CHECK (
  EXISTS (SELECT 1 FROM public.leads WHERE id = lead_id) AND
  EXISTS (SELECT 1 FROM public.free_resources WHERE id = resource_id AND is_active = true)
);