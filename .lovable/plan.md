

## Refine "The SphereSync System" Diagram

### File: `src/pages/SphereSyncFounders.tsx` (lines 731–817)

### Changes

**1. Trim intro copy** (lines 738–743)
Collapse the two paragraphs into one:
> "SphereSync gives agents a structured weekly system for activating their sphere, starting conversations, and staying top of mind."

Remove the second paragraph entirely.

**2. Add "INPUTS" / "OUTCOMES" labels**
Above the top row, add a small uppercase label: `SYSTEM INPUTS` (text-xs tracking-widest text-muted-foreground).
Above the bottom row, add: `SYSTEM OUTCOMES`.
This instantly communicates hierarchy and directionality.

**3. Enlarge and strengthen the center hub** (lines 773–777)
- Increase from `w-32 h-32` → `w-40 h-40 md:w-48 md:h-48`
- Add a double-ring effect: outer ring with `border-2 border-primary/20` and inner content area with `bg-primary/15 border-2 border-primary/40`
- Add a subtle pulsing glow: `shadow-[0_0_30px_rgba(0,162,173,0.15)]`
- Below "SphereSync" text, add a small tagline: `"Your Relationship Engine"` in `text-xs text-primary/70`

**4. Replace connector lines with directional arrows** (lines 767–782)
Replace the three thin `w-px h-8` lines above and below the hub with:
- **Top connectors**: Three lines fanning from each input card down into the hub, each ending with a small `▼` chevron/arrow. Use `h-10` height, `w-0.5 bg-primary/40`. On mobile, show a single centered line.
- **Bottom connectors**: Same pattern fanning out from hub to each output card, with `▼` arrows pointing down. 
- Use SVG or border-trick CSS arrows for the chevrons.

**5. Strengthen the result band** (lines 806–810)
- Increase padding: `p-5` → `p-6 md:p-8`
- Upgrade text: `text-lg` → `text-xl md:text-2xl font-bold`
- Add a subtle top border accent: `border-t-2 border-primary`

**6. Improve compliance note readability** (lines 812–816)
- Add `bg-muted/50 rounded-lg p-3` container
- Keep the shield icon and text as-is

