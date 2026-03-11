

## Fix Hero Formatting & Hide Announcement Bar on Founders Page

### Two changes:

**1. Hide Announcement Bar on `/spheresync-founders`**

In `src/App.tsx` line 33, update the condition to also exclude this route:

```
const showAnnouncementBar = location.pathname !== '/jump-start' && location.pathname !== '/spheresync-founders';
```

**2. Fix Hero Mockup Formatting**

The screenshot shows the mockup card is too large and floating labels overlap/get clipped. Changes in `src/pages/SphereSyncFounders.tsx`:

- Add `overflow-visible` to the mockup wrapper so floating labels aren't clipped
- Give the floating labels more breathing room by shifting them further right (`-right-6` or similar) so they sit outside the card cleanly rather than overlapping card content
- Scale down mockup padding and internal elements slightly to fit within the `max-h-[520px]` constraint
- Ensure the mockup container has proper relative positioning for the absolutely-positioned floating labels

