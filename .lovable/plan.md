

## Fix Hero Mockup Floating Labels

Move the three floating labels ("Activate Relationships", "Start Conversations", "Stay Top of Mind") from absolute-positioned on the right side to static labels above the mockup card on the left side, displayed as a horizontal row of pills.

### Changes in `src/pages/SphereSyncFounders.tsx`

**Remove** the three `motion.div` floating labels (lines 312–336) that are absolutely positioned with `-right-6`.

**Add** a row of three pill badges above the mockup card (inside the mockup container, before the `bg-card` div), displayed as a `flex gap-2 mb-3` row:
- "Activate Relationships" — `bg-primary text-primary-foreground`
- "Start Conversations" — `bg-accent text-accent-foreground`  
- "Stay Top of Mind" — `bg-secondary text-secondary-foreground`

Each pill uses `text-xs font-medium px-3 py-1.5 rounded-full` (same styling as current, minus the absolute positioning). Animate with staggered `motion.div` fade-in from left (`x: -20 → 0`).

Since labels are no longer absolutely positioned, the `overflow-visible` on the container can revert to default, eliminating any clipping issues entirely.

