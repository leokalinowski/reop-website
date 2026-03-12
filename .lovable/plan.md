

## Refine Section 2 — Pain-Driven "Database Gap"

### File: `src/pages/SphereSyncFounders.tsx`

### 1. Headline (lines 334–337)
Split into two lines with stronger hierarchy:
- Line 1: `"80% of your past clients say they'd use you again."`  (normal weight or semi-bold)
- Line 2: `"Most of them won't."` — larger, bold, `text-destructive` for emotional punch

### 2. Chart labels (lines 341–343)
- Left: `"Would use you again"` (remove quotes from display)
- Right: `"Actually call you first"` (replaces `"Actually uses you"`)

### 3. Spacing tightening (lines 332–421)
- Section padding: reduce `py-20 md:py-28` → `py-14 md:py-20`
- Inner `space-y-10` → `space-y-6`
- Chart container `pt-4` → `pt-2`, gap `gap-8` → `gap-6`
- Body copy section `space-y-4` → `space-y-3`
- Timeline strip `pt-6` → `pt-4`

### 4. Gap emphasis between charts
Add a visual "gap indicator" between the two gauges on `sm:` screens — a centered column with a downward arrow or "↓ 66% drop" label styled in `text-destructive` to make the contrast unmissable. On mobile it appears between the stacked charts.

### 5. Body copy (lines 386–391)
Update to:
- `"Not because you did a bad job. Because the relationship went quiet."`
- `"Every year you go without a system, that gap costs you transactions you already earned."`

### 6. Bottom 3-step strip (lines 394–419)
Update copy:
- Card 1: title `"Trust is earned"`, subtitle `"At closing, they love you"`
- Card 2: title `"The relationship goes quiet"`, subtitle `"Weeks pass without real contact"`
- Card 3: title `"Another agent becomes top of mind"`, subtitle `"Someone else fills the gap"`

Make more prominent: increase icon container size, bump title to `text-base font-bold`, add subtle `bg-card/50 border border-border/30 rounded-xl` background to each card for definition.

