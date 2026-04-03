

## Restyle Affiliate Pages to Match REOP Brand Guidelines

**Problem**: The affiliate pages use a custom dark theme (`#0E1E2B` bg, white text) that doesn't match the rest of the site. The site uses CSS custom properties (`bg-background`, `text-foreground`, `bg-primary`, etc.) with a light `#F8F9FA` background, `#005d6c` dark teal text, `#00a2ad` primary teal, `#99ca3c` accent green, and white cards with light borders.

**Approach**: Restyle all three affiliate pages to use the standard design system — same classes used by Index, CTASection, Benefits, SphereSync, etc.

### Changes per file

**1. `AffiliateSales.tsx`**
- Replace dark bg with `bg-background text-foreground`
- Add `Navigation` component at top instead of bare Logo header
- Use `FooterMinimal` (already present) or switch to `Footer`
- Hero: use `text-foreground` headings, `text-primary` for accents, `text-muted-foreground` for body, `bg-muted` badge instead of custom dark badge
- "How It Works" cards: `bg-card border border-border rounded-xl` with `text-primary` icons
- "The Numbers" stats: use `bg-slate-900` dark band (same pattern as Benefits section) with `text-slate-50` text
- "What You Get" checklist: `text-foreground` items, `text-primary` check icons
- "Who It's For" cards: `bg-card border border-border` with hover shadow
- CTA buttons: use `Button` component with standard `bg-primary text-primary-foreground` classes
- Remove all inline `style={{ fontFamily }}` — let the global font stack apply
- Remove all hardcoded hex colors (`#0E1E2B`, `#0AADAD`, `#0B8F8F`, `#9AAAB8`, `#B8892A`, `#C8D8E8`)

**2. `AffiliateApply.tsx`**
- Same bg/text swap to `bg-background text-foreground`
- Add `Navigation` at top, back link uses `text-primary`
- Form inputs: use default Input/Select styling (remove custom `inputClasses` with dark transparent backgrounds)
- Labels: `text-foreground` or `text-muted-foreground`
- Submit button: use `Button` component, full-width, standard primary styling
- Remove all hardcoded hex colors and inline font styles

**3. `AffiliateThankYou.tsx`**
- Same bg/text treatment
- Success icon: `text-primary` on `bg-primary/10` circle
- Card: `bg-card border border-border`
- Link: `text-primary`

### Design tokens used (from CSS variables)
- `bg-background` → `#F8F9FA`
- `text-foreground` → `#005d6c`
- `bg-primary / text-primary` → `#00a2ad`
- `bg-card` → white
- `border-border` → light gray
- `text-muted-foreground` → lighter teal
- `bg-slate-900` → dark sections (sparingly)
- `text-accent` → `#99ca3c` green (for highlights)

