

## Affiliate Funnel — Sales Page, Signup, and Confirmation

Three new pages integrated with GoHighLevel's Affiliate Manager, following the distraction-free funnel pattern used on existing landing pages.

### Pages

**1. `/affiliate` — Sales Page**
- Hero: headline about earning commissions promoting SphereSync ($997 product)
- Commission details: percentage-based (e.g. "Earn 20% per sale — $199 per referral"), with placeholder % to finalize
- How it works: 3-step visual (Apply → Get your link → Earn)
- Who it's for section targeting real estate coaches, influencers, community leaders
- CTA buttons throughout linking to `/affiliate/apply`
- Distraction-free: no main nav, no announcement bar — uses FooterMinimal

**2. `/affiliate/apply` — Signup Page**
- Form fields: first name, last name, email, phone, social media handles (Instagram, YouTube, TikTok — optional), audience size (select: <1K, 1-5K, 5-25K, 25K+), real estate experience level (select), how they plan to promote (textarea)
- Honeypot field for bot protection
- Client-side validation + server-side validation via edge function
- On submit: sends data to GHL Affiliate Manager webhook, stores in Supabase `affiliate_leads` table, redirects to confirmation page

**3. `/affiliate/thank-you` — Confirmation Page**
- Success message: "You're in! Check your email for next steps"
- Brief summary of what to expect (GHL will send affiliate link, onboarding materials)
- CTA to go back to main site

### Backend

**New edge function: `submit-affiliate`**
- Validates input (Zod)
- Inserts into new `affiliate_leads` table
- Sends data to GHL webhook (using existing `GHL_WEBHOOK_URL` secret) with affiliate-specific tags: `["Affiliate Applicant", audience size tag, experience tag]`
- Rate limiting (same pattern as `submit-lead`)

**New Supabase table: `affiliate_leads`**
```sql
create table public.affiliate_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  instagram text,
  youtube text,
  tiktok text,
  audience_size text,
  real_estate_experience text,
  promotion_plan text,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.affiliate_leads enable row level security;
```
- RLS: no public read, admin-only select via `has_role`

### Routing

- Add three routes in `App.tsx`: `/affiliate`, `/affiliate/apply`, `/affiliate/thank-you`
- Hide announcement bar on all three (add to the existing filter)

### Design

- Match the dark, premium aesthetic of the Founding Table / SphereSyncFounders pages
- Use existing UI components (Button, Card, Badge, Input, Select, Textarea)
- Mobile-responsive throughout

### Files to create/modify
- `src/pages/AffiliateSales.tsx` — sales landing page
- `src/pages/AffiliateApply.tsx` — signup form page
- `src/pages/AffiliateThankYou.tsx` — confirmation page
- `supabase/functions/submit-affiliate/index.ts` — edge function
- `src/App.tsx` — add routes
- Migration for `affiliate_leads` table

