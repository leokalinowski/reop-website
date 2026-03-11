

## Hero Section Rework — SphereSync Founders

### Problems Identified

**Desktop (1194px):**
- Headline is too large (text-6xl) and dominates the entire viewport — takes up ~70% of visible area
- Body copy, pull-quote, and CTA are all pushed below the fold
- The product mockup on the right is partially cut off at the bottom
- No clear visual hierarchy — the headline overpowers everything
- Too much vertical space before the CTA becomes visible

**Mobile (390px):**
- Badges stack awkwardly (two separate lines)
- Headline still very large — requires significant scrolling to reach CTA
- Product mockup is hidden (`hidden md:block`) — mobile users get a text-only hero with no visual anchor
- Pull-quote and CTA buried far below

### Proposed Changes

**1. Tighten headline sizing**
- Desktop: reduce from `md:text-5xl lg:text-6xl` to `md:text-4xl lg:text-5xl`
- Mobile: reduce from `text-3xl sm:text-4xl` to `text-2xl sm:text-3xl`
- This alone recovers ~200px of vertical space

**2. Restructure copy hierarchy per memory guideline**
- Keep badges and headline at top
- Move the narrative paragraphs ("Right now, someone in your sphere...") BELOW the CTA
- Keep the pull-quote ("Relationships should still win") directly above the CTA for emotional punch
- This ensures the CTA is visible above the fold on desktop

**3. Condense body copy spacing**
- Reduce `space-y-6` on the left column to `space-y-4`
- Reduce paragraph spacing from `space-y-4` to `space-y-3`

**4. Fix product mockup positioning**
- Add `self-center` and constrain max height so it doesn't overflow
- Ensure floating labels stay within bounds (change `-right-4` to `right-2`)

**5. Mobile hero improvements**
- Show a simplified, compact version of the Sphere Yield stat card on mobile (below the CTA) — gives mobile users a visual anchor
- Tighten padding: reduce `py-16` to `py-10` on mobile

**6. Section vertical alignment**
- Change `min-h-screen` to `min-h-[85vh] md:min-h-screen` so the hero doesn't feel empty on very tall screens
- Ensure CTA + microcopy are visible in the initial viewport on desktop

### Technical Details

All changes in `src/pages/SphereSyncFounders.tsx`, lines 190–328 (hero section only).

- Reorder JSX: badges → headline → pull-quote → CTA → narrative body copy
- Adjust Tailwind classes for font sizes, spacing, padding
- Add a new mobile-only simplified mockup card after the CTA (reuse the Sphere Yield stat card markup)
- Constrain the right-column mockup container with `max-h-[520px] overflow-hidden`

No new files or dependencies needed.

