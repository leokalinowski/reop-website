## Fix Section 2 Readability

### File: `src/pages/SphereSyncFounders.tsx`

### Problem

The section has a dark teal (`bg-secondary`) background. Two issues:

1. **Gap indicator** — `bg-destructive/10` on dark teal is too subtle; the "↓ 66% drop-off" text lacks contrast. Also get rid of the right arrow
2. **Timeline cards** — `bg-card/50` (semi-transparent white) creates a washed-out background where white text (`text-secondary-foreground`) has poor contrast

### Fixes

**Gap indicator (lines 383–387):**

- Change `bg-destructive/10` → `bg-destructive/20` for stronger background
- Change `border-destructive/30` → `border-destructive/50` for more definition
- Make "↓ 66%" text slightly larger (`text-xl`) and the "drop-off" label `text-destructive/80` for better legibility

**Timeline cards (line 435):**

- Change `bg-card/50` → `bg-secondary-foreground/10` (light white overlay on dark bg, maintaining dark-on-dark feel without washing out)
- Change `border-border/30` → `border-secondary-foreground/20` for subtle but visible borders
- Card text `text-secondary-foreground` and `text-secondary-foreground/60` remain readable against the darker card background

**Card icon containers (line 442):**

- The colored icon backgrounds (`bg-primary/10`, `bg-accent/10`, `bg-destructive/10`) are also low contrast on this bg — bump to `/20` opacity

These are purely opacity/color adjustments — no layout or structural changes.