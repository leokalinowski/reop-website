

## Rewrite SphereSync Founders Landing Page

Full rewrite of `src/pages/SphereSyncFounders.tsx` to match the 17-section wireframe. The page expands from 15 to 17 sections with significant visual and structural upgrades.

---

### Major Changes

**1. Hero — Two-column layout**
- Left: full copy block (headline, subheadline with narrative text, pull-quote, CTA, microcopy)
- Right: mock product UI showing SphereSync dashboard, Sphere Yield stat card, 13-week cycle preview, floating labels ("Activate Relationships", "Start Conversations", "Stay Top of Mind")
- Current hero is centered single-column; this becomes `md:grid-cols-2`

**2. Database Gap — Visual comparison**
- Add a visual bar/comparison showing "Would use you again" (80%) vs "Actually call you first" (much smaller)
- Optional trust-fade visual: earned at closing → visibility fades → another agent stays top of mind

**3. What Inaction Costs — Stat cards + gap visualization**
- Three large stat cards: "200–500 people", "17–40+ potential transactions", "3–5 actual transactions"
- Gap visualization bar (actual vs potential)
- Three hidden-cost icon cards: Missed conversations, Referrals elsewhere, Lost transactions

**4. VSL Section — NEW**
- New section between Inaction Costs and Pam's Note
- Centered video placeholder (embedded player or placeholder frame)
- Three icon takeaways below video
- CTA underneath

**5. A Note from Pam — Two-column**
- Left column: Pam photo (`/images/pamobryant.png`) with signature treatment
- Right column: full founder note text
- Pull-quote callout box for "The problem wasn't belief..."

**6. Data Behind SphereSync — Ratio visuals**
- Three-part data story with ratio visuals (contact icons → transaction icons)
- Strong yield benchmark card, weaker industry expectation, Sphere Yield metric card

**7. Why This Matters — Two-column comparison**
- Side-by-side: "Built for Scale" vs "Built on Trust" comparison cards
- Bottom band: "SphereSync brings structure back to the relationship-driven model."

**8. Founders Rally Line** — Minimal changes, keep as bold statement band

**9. SphereSync System — Hub-and-spoke diagram**
- Top row: three input cards (Outreach Rhythm, Relationship Prompts, Performance Dashboard)
- Center node: SphereSync
- Output cards: Activate, Conversations, Top of Mind
- Bottom result band + compliance strip with shield icon

**10. 13-Week Cycle — Circular wheel**
- CSS-based 13-segment circular wheel with one segment highlighted as "This Week"
- Benefit cards underneath
- Closing pull-quote band

**11. Founders Cohort — Split from Yield Challenge**
- Two-column: left explains cohort, right uses stacked value cards

**12. Yield Challenge — Separate section**
- Featured Sphere Yield metric, example ratio pills, challenge explanation, prize callout

**13–16.** What Founders Receive, What Happens When You Join, Investment, Who It's For — Copy updates per wireframe, keep existing visual patterns. Add continuation line to Investment: "After the six-month Founder cohort, members can continue with SphereSync Core."

**17. Final CTA — Relationship network background**
- Add subtle connected-node/network SVG background motif
- Keep existing copy and structure

---

### Technical Approach

- All changes in `src/pages/SphereSyncFounders.tsx` (single file rewrite)
- Add a new `yieldChallenge` useInView ref and a `vsl` useInView ref
- Product mockup in hero built with Tailwind/CSS (mock cards, not images)
- 13-week wheel built with CSS transforms (rotated segments in a circle)
- Hub-and-spoke diagram built with CSS grid and connecting lines
- Gap visualization uses Tailwind width utilities for bar comparison
- Network background motif uses inline SVG pattern
- No new dependencies needed

