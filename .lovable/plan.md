

## Refine Section 3 — Cost-of-Inaction Conversion Section

### File: `src/pages/SphereSyncFounders.tsx` (lines 454–533)

### 1. Tighten section spacing
- Section padding: `py-20 md:py-28` → `py-14 md:py-20`
- Inner container: `space-y-10` → `space-y-8`

### 2. Update top copy hierarchy (lines 461–467)
Replace with the requested messaging sequence:
- `"The average agent has 200–500 people in their sphere."` — normal muted
- `"At a healthy activation rate, that database should be producing 17 to 40+ transactions per year."` — highlight numbers in `text-primary font-semibold`
- `"Most agents get 3–5."` — `text-2xl font-bold text-destructive` (change from `text-foreground` to `text-destructive` to signal loss)
- `"That gap doesn't just disappear. It goes to another agent."` — new line, muted
- **Thesis line**: `"This isn't a talent problem. It's a system problem."` — promote to `text-2xl md:text-3xl font-bold text-foreground` with `border-l-4 border-primary pl-5 py-2` to make it the dominant statement in the upper portion

### 3. Stat cards (lines 470–481) — keep structure, update labels for story clarity
- Card 1: stat `200–500`, label `"People already in your sphere"` (emphasize "already")
- Card 2: stat `17–40+`, label `"Transactions a healthy system should produce"`
- Card 3: stat `3–5`, label `"What most agents actually close from their sphere"`

### 4. Gap visualization (lines 483–506) — emphasize the leak
- Keep the two horizontal bars
- Add a third visual element: between or after the bars, show the **missing portion** explicitly
  - Add a label on the "Potential" bar's empty space (the 15% gap area) or below the bars: a small callout styled `text-destructive/80 text-xs italic` reading `"Business leaking to other agents"`
- Change the background track of the potential bar from `bg-border` to show the unfilled portion in `bg-destructive/15` with a subtle striped/dashed pattern (CSS background) to visually communicate "lost" rather than "empty"
- Add a summary line below the bars: `"The gap between these bars is business that didn't vanish — it went to the agent who stayed visible."` in `text-sm text-muted-foreground italic`

### 5. Hidden-cost cards (lines 508–528) — sharpen copy
- Card 1: title `"Missed conversations"`, desc `"People you meant to call, but didn't"`
- Card 2: title `"Referrals that went elsewhere"`, desc `"Business that went to the agent who stayed visible"`
- Card 3: title `"Transactions you never knew you lost"`, desc `"Deals that happened without you ever knowing"`

### 6. Closing line (lines 530–532) — increase prominence
Update text to: `"Every week without a system is a conversation that didn't happen, a referral that went somewhere else, or a transaction you'll never even know you lost."`
Style: bump to `text-lg md:text-xl font-medium text-foreground` (from `text-muted-foreground`) with `border-t border-border/50 pt-6` to separate it as the section takeaway.

