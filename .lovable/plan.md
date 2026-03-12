

## Refine Section 6 — "The Data Behind SphereSync"

### File: `src/pages/SphereSyncFounders.tsx` (lines 658–715)

### Changes

**1. Upper copy (lines 666–671)**
Split into three distinct paragraphs with the exact copy provided. Make the third paragraph ("The question is not whether relationships work...") visually prominent:
- `text-xl md:text-2xl font-semibold text-foreground` with `mt-6 mb-2` extra spacing
- Constrain copy width to `max-w-2xl` for comfortable line length

**2. Stat cards (lines 674–705)**

- **Card 1**: Change `1 : 6-8` → `1 : 4–6`. Add eyebrow label `HISTORICAL BENCHMARK` (replacing "Historical Best"). Use `border-primary/30` and `text-primary` for the stat — make it feel strong.
- **Card 2**: Keep `1 : 12+`. Eyebrow `INDUSTRY TODAY`. Use `border-destructive/20`, `text-destructive` — visually weaker/muted compared to Card 1 to emphasize the decline.
- **Card 3**: Keep as metric card. Eyebrow `SPHERESYNC METRIC`. Keep the distinct `bg-primary/5 border-2 border-primary/30` styling.

**3. Lower copy (lines 707–713)**
Two short paragraphs using exact copy provided, then the closing callout with increased prominence:
- Closing callout: `text-lg md:text-xl font-semibold text-foreground` with `border-l-4 border-primary pl-5 py-3 bg-primary/5 rounded-r-lg` to make it feel like the section takeaway, not just another paragraph.
- Change "prove" → "demonstrate" per the provided copy.

**4. Minor spacing**
- Container `space-y-10` → `space-y-8` for tighter feel
- Copy blocks use `max-w-2xl` for narrower, more readable line length

