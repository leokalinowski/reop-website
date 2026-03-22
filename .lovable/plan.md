

## Add Sticky Countdown Timer Bar to SphereSync Founders Page

**File:** `src/pages/SphereSyncFounders.tsx`

### Changes

1. **Add countdown timer state** (~line 155-178): Add a `timeLeft` state with `useState` and a `useEffect` with `setInterval` that counts down to `April 15, 2026 11:59 PM EST` (UTC-5), calculating days/hours/minutes/seconds.

2. **Render sticky bar** (~line 193, right after `<main>`): Insert a fixed-position bar at the top:
   - `fixed top-0 left-0 right-0 z-50 bg-secondary` with ~44px height
   - Left: "Founder Access closes in:" + countdown digits styled in `text-primary font-mono font-bold`
   - Right: Small "Apply Now" button linking to `APPLY_URL`
   - Mobile: flex-wrap or stacked layout, still compact
   - Format: `XXd XXh XXm XXs`

3. **Add top padding to `<main>`**: Change `<main className="overflow-hidden">` to `<main className="overflow-hidden pt-12">` (or similar ~48px) so content isn't hidden behind the fixed bar.

### Technical notes
- Reuse existing `APPLY_URL` constant for the button link
- Use `setInterval` at 1000ms, clean up on unmount
- Show "Founder Access has closed" if deadline has passed

