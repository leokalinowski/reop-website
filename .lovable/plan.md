

## Build Agent Recruitment Page for Blue Jay Properties

### Overview
Create a recruitment landing page at `/join/blue-jay-properties` with the job description content and an application form. Submissions go to a new Supabase table, trigger a webhook to GHL, and redirect to a thank-you page.

### New files

**1. `src/pages/JoinBlueJay.tsx`** — Landing page + application form
- Hero section: "Join Blue Jay Properties Group" with Samir Redwan / Keller Williams Capital Properties / Rockville, MD
- Job description sections pulled from the provided copy (why join, what you bring, what success looks like)
- Inline application form at the bottom with fields:
  - First name, last name, email, phone (required)
  - License state(s) — multi-select or checkboxes for MD, DC, VA, Other
  - Current annual transactions (select: 1-2, 3-5, 6-7, 8-10, 10+)
  - Years of experience (select: <1, 1-3, 3-5, 5-10, 10+)
  - Short note / why you want to join (textarea)
  - Honeypot field (hidden)
- Uses existing Navigation + FooterMinimal components
- Submits via `supabase.functions.invoke('submit-agent-application', { body })`
- On success, navigates to `/join/blue-jay-properties/thank-you`

**2. `src/pages/JoinBlueJayThankYou.tsx`** — Thank-you page
- Simple confirmation: "Your application has been received. We'll review it and be in touch shortly."
- Link back to homepage

**3. `supabase/functions/submit-agent-application/index.ts`** — Edge function
- Rate limiting (same pattern as submit-affiliate)
- Input validation (required fields, email format, string lengths)
- Honeypot check
- Insert into new `agent_applications` table
- Fire-and-forget webhook POST to user-provided URL (to be added once user creates the webhook)
- Returns `{ success: true, applicationId }`

### Database migration

New table `agent_applications`:

```sql
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

CREATE POLICY "Only service role can insert" ON public.agent_applications
  FOR INSERT TO public WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only admins can view" ON public.agent_applications
  FOR SELECT TO authenticated USING (is_admin());

CREATE POLICY "Only admins can update" ON public.agent_applications
  FOR UPDATE TO authenticated USING (is_admin());

CREATE POLICY "Only admins can delete" ON public.agent_applications
  FOR DELETE TO authenticated USING (is_admin());
```

The `team_slug` field future-proofs for multiple team recruitment pages.

### Route addition

In `src/App.tsx`, add:
- `/join/blue-jay-properties` → `JoinBlueJay`
- `/join/blue-jay-properties/thank-you` → `JoinBlueJayThankYou`

### Webhook

The edge function will include a placeholder for the webhook URL. Once you create the new GHL webhook trigger, share the URL and I'll hardcode it in the function (same pattern as the affiliate webhook).

### Design approach
- Follows existing page patterns (SEO component, Navigation, FooterMinimal)
- Dark hero section matching brand, content sections with clear hierarchy
- Form styled with existing shadcn/ui components (Input, Select, Textarea, Button)
- Mobile-responsive layout
- Equal opportunity employer disclaimer at bottom

