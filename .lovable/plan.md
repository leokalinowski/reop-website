

## Make the top of the Founding Table page more compact

**Problem**: The hero + letter section takes up a lot of vertical space, requiring scrolling before reaching the meat of the content. We want to keep all the text but tighten spacing so visitors see more above the fold.

**Approach — tighten spacing, no content removed**:

### 1. Reduce hero padding and margins (`FoundingTable.css`)
- `.ft-hero` padding: `4rem 2rem 0` → `2rem 2rem 0`
- `.invite-flag` margin-bottom: `2rem` → `1rem`
- `.hero-headline` margin-bottom: `1.5rem` → `1rem`
- `.hero-rule` margin-bottom: `2.5rem` → `1.5rem`

### 2. Tighten letter grid spacing
- `.letter-grid` padding-bottom: `3rem` → `1.5rem`, gap: `3rem` → `2rem`
- `.letter-body p` margin-bottom: `1.25rem` → `0.85rem`, line-height: `1.9` → `1.7`
- `.pullquote` margin: `1.5rem 0` → `1rem 0`

### 3. Compact the first CTA area
- `.btn-wrap` padding: `2rem` → `1rem 2rem`

### 4. Optional: Add a subtle scroll indicator
- Add a small animated down-arrow or "Read my letter ↓" text below the headline to invite scrolling, making it feel intentional rather than frustrating.

**Result**: ~30-40% less vertical space in the top section. The letter grid and first CTA will be visible much sooner. All text stays intact.

