

## Refine Rally Band (Section 8) and Why This Matters (Section 7)

### File: `src/pages/SphereSyncFounders.tsx`

### Section 8 — Rally Band (lines 785–796)

Replace the two-line copy with the preferred manifesto version. Remove the second line entirely to keep it punchy and short:

```
The industry told you to buy leads.
SphereSync helps you activate the relationships you already earned.
```

- Single `<p>` with line break or two `<p>` elements
- First line: `text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-foreground`
- Second line: `text-primary` highlight on the whole sentence
- Remove the "SphereSync Founders are done leaving that business on the table" line
- Keep `bg-secondary` full-width band, tighten padding to `py-12 md:py-16`

### Section 7 — Why This Matters (lines 721–783)

**Intro copy (lines 728–734)**: Replace the five paragraphs with the tighter two-paragraph version:

Paragraph 1:
> Real estate is consolidating. Large teams and lead platforms are pushing toward scale and volume.

Paragraph 2 (with `text-foreground font-medium` on the first sentence):
> SphereSync supports a different kind of business: one built on trust, consistency, and relationship-driven referrals.

- Reduce `space-y-4` → `space-y-3` in the copy block
- Keep `max-w-3xl` centered

**Comparison cards (lines 737–774)**: Update right card's third bullet from "Quality-driven model" → "Consistency over constant chasing". Keep all other card content and styling the same.

**Bottom band (lines 776–782)**: Keep as-is — copy already matches the request.

**Section spacing**: Tighten `space-y-10` → `space-y-8` for a faster-reading feel.

