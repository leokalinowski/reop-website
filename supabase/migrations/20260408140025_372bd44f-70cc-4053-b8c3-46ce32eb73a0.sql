CREATE TABLE public.agent_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  license_states text[] DEFAULT '{}',
  annual_transactions text,
  years_experience text,
  note text,
  team_slug text NOT NULL DEFAULT 'blue-jay-properties',
  status text DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.agent_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can insert agent applications" ON public.agent_applications
  FOR INSERT TO public WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only admins can view agent applications" ON public.agent_applications
  FOR SELECT TO authenticated USING (is_admin());

CREATE POLICY "Only admins can update agent applications" ON public.agent_applications
  FOR UPDATE TO authenticated USING (is_admin());

CREATE POLICY "Only admins can delete agent applications" ON public.agent_applications
  FOR DELETE TO authenticated USING (is_admin());

CREATE TRIGGER update_agent_applications_updated_at
  BEFORE UPDATE ON public.agent_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();