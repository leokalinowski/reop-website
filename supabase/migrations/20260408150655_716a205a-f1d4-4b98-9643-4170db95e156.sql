-- Fix 1: Drop the overly permissive SELECT policy on pdf-reports bucket
DROP POLICY IF EXISTS "Admin can view all PDF reports" ON storage.objects;

-- Recreate with admin check
CREATE POLICY "Admin can view all PDF reports"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'pdf-reports' AND public.is_admin());

-- Fix 2: Drop the overly permissive INSERT policy on pdf-reports bucket
DROP POLICY IF EXISTS "System can create PDF reports" ON storage.objects;

-- Recreate restricted to service role only
CREATE POLICY "System can create PDF reports"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'pdf-reports');