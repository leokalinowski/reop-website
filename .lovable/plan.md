

## Redesign Hero Section — SphereSyncFounders

The hero has too much text crammed together with little visual hierarchy. The fix: tighten the content, improve spacing, and create clear visual layers.

### Changes (all in `src/pages/SphereSyncFounders.tsx`, lines 148-191)

**Layout & Structure:**
- Split into a cleaner two-part layout: top headline block + bottom supporting copy
- Move the secondary paragraphs ("This isn't another CRM...", "Built from decades...") below the CTA, or remove from hero entirely (push to section 2 transition)
- Keep hero focused: badges → headline → one-liner subheadline → CTA + microcopy

**Visual Improvements:**
- Add a subtle `bg-secondary/5` background behind the hero instead of relying solely on LightRays + cosmic-gradient
- Increase vertical padding (`min-h-screen` with better centering)
- Make the headline smaller on mobile (currently `text-4xl` minimum — keep, but tighten `leading`)
- Add a decorative divider line or glow accent between headline and subheadline
- Give the subheadline paragraph more breathing room with `mt-6`
- Style the "Relationships should still win" line as a standout pull-quote with larger text and primary color
- Reduce the secondary copy block — keep only the strongest 2 lines, styled lighter

**Specific Hero Content:**
```
Badges: [SphereSync Founders] [Limited to 50 Founders]

H1: "50 agents. Six months. One goal."  (primary color on "One goal.")

Subheadline (xl): "Prove how powerful a well-activated sphere 
                    can be at generating referrals."

Pull quote (lg, primary, semibold): 
  "Relationships should still win. 
   SphereSync Founders are the agents proving that they do."

[Apply for Founder Access] button
"Founder enrollment closes April 15 or when the cohort fills."
```

The secondary explanatory text ("Right now, someone in your sphere...", "This isn't another CRM...") moves into the Database Gap section or a new brief transition section, keeping the hero punchy and scannable.

**No color palette changes** — uses existing `text-primary`, `text-foreground`, `text-muted-foreground`, `bg-primary/5`.

