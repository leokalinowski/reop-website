## Build `/call` — Strategy Call Booking Landing Page

A polished, distraction-free landing page where DMV agents book a strategy call with REOP. Embedded calendar (no redirect), three-path framing, and on-brand REOP styling.

### Files to create / edit

**Create** `src/pages/Call.tsx` — the full single-page landing  
**Edit** `src/App.tsx` — register the `/call` route  
**Edit** `mem://index.md` + add `mem://marketing/call-strategy-booking` — record the new funnel

### Page structure (in order)

1. **Top bar** — REOP logo only (uses `<Logo />`), no nav. Matches the distraction-free funnel pattern from `/spheresync-founders` and `/jump-start`.

2. **Hero**
   - Headline: *"Find the right path to grow your real estate business — without guessing what to do next."*
   - Subhead + supporting line per spec
   - Primary CTA: **Book Your Strategy Call** → smooth-scrolls to `#book` section
   - Soft teal/light background (REOP light aesthetic)

3. **What We'll Cover** — section heading + 3 cards (Current State / Biggest Opportunity / Best-Fit Path), light bg, lucide icons (Compass, Target, Route)

4. **Three Paths** — 3 cards on a contrasting light-slate band:
   - SphereSync
   - Done-With-You Growth Support
   - Full-Service Marketing & Business Support
   - Bridge copy beneath: *"You do not need to know which path is right before the call…"*

5. **About Pam** — Two-column: photo of Pam (`/images/pam-obryant.jpg` — already in the project, used on Founding Table) + copy. Heading: *"Led by people who understand real estate — not just marketing."*

6. **Testimonial** — Single centered pull-quote card with placeholder text and `— [Agent Name], [Market/Role]` attribution. Clearly marked as placeholder so you can swap later.

7. **Calendar booking** (`#book`) — Section heading + copy + responsive embed:
   - If a Calendly URL is provided, embed via `<iframe>` in an aspect-ratio wrapper (min-h ~720px on desktop, full-width on mobile)
   - Until you paste the URL, render a clearly labeled placeholder block: *"Embedded booking calendar goes here."* with a `CALENDLY_URL` constant at the top of the file for one-line swap-in
   - **Action needed from you:** drop your Calendly link in the chat (e.g. `https://calendly.com/realestateonpurpose/strategy-call`) and I'll wire it in

8. **Final CTA** — Dark teal band (`bg-[#005d6c]` or slate-900) with white text. Heading + copy + **Schedule My Call** button → scrolls to `#book`.

9. **Minimal footer** — `<FooterMinimal />` (matches other funnel pages)

### Brand & design rules applied
- Colors: Primary teal `#00a2ad`, dark teal `#005d6c`, accent green `#99ca3c`. No navy.
- Alternating light / light-slate / dark sections per the section-alternation pattern
- `rounded-xl` cards, soft shadows, `py-12 md:py-16` section padding (landing-page rhythm)
- Mobile-first, breakpoints at `md:` and `lg:` only
- SEO via `<SEO title="Book a Strategy Call — Real Estate on Purpose" description="..." />`

### Functional requirements
- `/call` is a real page (no redirect)
- Both CTA buttons scroll smoothly to `#book` (using `scrollIntoView({behavior:'smooth'})`)
- No pricing claims, no extra offers beyond the three paths
- Fully responsive

### Open item
Reply with your Calendly URL (or confirm "use placeholder for now") and I'll either embed it directly in this build or leave the labeled placeholder + the `CALENDLY_URL` constant ready for a one-line update later.