
CREATE TABLE public.affiliate_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  instagram text,
  youtube text,
  tiktok text,
  audience_size text,
  real_estate_experience text,
  promotion_plan text,
  status text DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can insert affiliate leads"
ON public.affiliate_leads
FOR INSERT
TO public
WITH CHECK (auth.role() = 'service_role'::text);

CREATE POLICY "Only admins can view affiliate leads"
ON public.affiliate_leads
FOR SELECT
TO authenticated
USING (is_admin());

CREATE POLICY "Only admins can update affiliate leads"
ON public.affiliate_leads
FOR UPDATE
TO authenticated
USING (is_admin());

CREATE POLICY "Only admins can delete affiliate leads"
ON public.affiliate_leads
FOR DELETE
TO authenticated
USING (is_admin());

CREATE TRIGGER update_affiliate_leads_updated_at
BEFORE UPDATE ON public.affiliate_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
