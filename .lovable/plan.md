

## Add Card Containers Around Database Gap Gauges

### File: `src/pages/SphereSyncFounders.tsx`

Wrap each gauge (left and right) in a styled card container that matches the page's existing card aesthetic — rounded corners, subtle border, and a slightly lighter background against the dark `bg-secondary` section.

**Lines 359 and 394** — Wrap each gauge's outer `div` in a container with these classes:
- `bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-2xl p-6` (matches the Trust Fade Timeline cards already used at line 434 in the same section)

This gives both gauges a visible bounded card that's consistent with the nearby timeline cards, making them easier to read against the dark background.

The gap indicator pill in the middle stays as-is (it already has its own `bg-destructive/20` container).

