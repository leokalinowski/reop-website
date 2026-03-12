## Add "Learn More" button to the hero

### File: `src/pages/SphereSyncFounders.tsx`

**1. Add an `id` to the VSL section** (~line 547)
Add `id="vsl"` to the VSL section element so it can be scrolled to.

**2. Add a secondary button below the primary CTA** (~lines 229-234)
After the `<PrimaryCTA>` button, add a ghost/outline button that scrolls to `#vsl`:

```tsx
<div className="flex flex-col sm:flex-row gap-3 pt-2">
  <PrimaryCTA label="Claim Your Founder Invitation" />
  <a href="#vsl" className="inline-flex items-center ...">
    ▶ Watch the Video
  </a>
</div>
```

Style the secondary button as an outline/ghost style with a play icon (using lucide `Play` icon), matching the existing design language. Use `scroll-behavior: smooth` or a simple `scrollIntoView` call.