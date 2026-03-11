

## SphereSync Founders Landing Page

A new long-form conversion page at `/spheresync-founders` — a focused landing page for the 50-seat Founder cohort program ($997, closes April 15).

### Route & Navigation
- New file: `src/pages/SphereSyncFounders.tsx`
- Add `/spheresync-founders` route in `App.tsx`
- No nav link added (this is a funnel page, not a main nav item)

### Page Structure (15 sections)

| # | Section | Background | Key Element |
|---|---------|-----------|-------------|
| 1 | Hero | LightRays + cosmic bg | "50 agents. Six months..." headline, "Apply for Founder Access" CTA, "Limited to 50 Founders" badge, April 15 deadline |
| 2 | The Database Gap | `bg-primary/5` | "80% of past clients..." stat block |
| 3 | What Inaction Costs | default | Sphere math (200-500 contacts → 17-40 transactions vs 3-5), "absence of a system" |
| 4 | A Note from Pam | `bg-primary/5` | Long-form letter with signature, personal tone, blockquote-style |
| 5 | The Data Behind SphereSync | default | Sphere Yield metric intro, Founder cohort research framing |
| 6 | Why This Matters | `bg-primary/5` | Industry consolidation, relationship-driven model positioning |
| 7 | Founders Rally Line | default, centered bold | "The industry told you to buy leads..." rallying statement |
| 8 | The SphereSync System | `bg-primary/5` | Three behaviors (activate, start conversations, stay top of mind) + compliance note |
| 9 | The 13-Week Sphere Cycle | default | Visual cycle explanation, 3 bullet outcomes |
| 10 | The Founders Cohort + Yield Challenge | `bg-primary/5` | 50 Founders, two cohorts of 25, Sphere Yield metric, recognition prize |
| 11 | What Founders Receive | default | 6-item feature grid with icons (SphereSync access, office hours, strategy sessions, audit, data project, recognition) |
| 12 | What Happens When You Join | `bg-primary/5` | 4-step timeline (Audit → Structure → Rhythm → Track), "1-2 hours/week" |
| 13 | Founder Cohort Investment | default | Pricing card with BackgroundGradient, $997, bullet list of inclusions, "Limited to 50 Founders" |
| 14 | Who It's For | `bg-primary/5` | Checklist of ideal founder traits |
| 15 | Final CTA | cosmic glow bg | "Every week you wait..." urgency copy, dual deadline (50 seats + April 15), Apply CTA |

### Technical Approach
- Same patterns as existing SphereSync.tsx and ProfessionalPractice.tsx
- `useInView` hook for scroll-triggered fade-in animations
- Framer Motion for staggered card animations
- Components: Navigation, FooterMinimal, Button, Card, Badge, BackgroundGradient, LightRays, SEO
- `APPLY_URL = '#'` placeholder constant for all CTAs
- "A Note from Pam" section styled as a letter with italic signature "— Pam"
- "Rally Line" section uses large bold centered text for impact
- Responsive: single column mobile, multi-column grids on desktop
- CTA repeated after sections 3, 7, 10, 12, and as section 15

### Design Notes
- More editorial/long-form than SphereSync Core — heavier on narrative copy
- Pam's letter section gets special treatment: slightly narrower max-width, serif-feeling spacing, personal tone
- Sphere Yield metric highlighted with `text-primary` throughout
- Urgency elements: "50 seats", "April 15 deadline" badges near CTAs
- No video CTA on this page (unlike SphereSync Core)

