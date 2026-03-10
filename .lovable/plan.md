

## SphereSync Core Landing Page

A 12-section conversion-focused landing page at `/spheresync`, following the existing design system and patterns from JumpStart/ProfessionalPractice.

### Page Structure

| # | Section | Style | Key Element |
|---|---------|-------|-------------|
| 1 | Hero | Full viewport, cosmic effects, LightRays on desktop | Dual CTAs: "Start My Weekly Follow-Up System" + "Watch the Overview" (placeholder) |
| 2 | The Problem | `bg-primary/5` | Bulleted pain points with italic emphasis |
| 3 | The Real Cost | Default bg | Emotional copy about lost relationships |
| 4 | The Solution | `bg-primary/5` | "Instead of..." list contrasting chaos vs system |
| 5 | How It Works | Default bg | 4 numbered steps in cards with icons |
| 6 | What You Get | `bg-primary/5` | 6-item feature grid (2x3 on desktop) with icons |
| 7 | Why It's Different | Default bg | Bulleted differentiators |
| 8 | Who It's For | `bg-primary/5` | Checklist of ideal user traits + "not for" line |
| 9 | The Value | Default bg | ROI framing with centered text |
| 10 | Pricing | `bg-primary/5` | Single pricing card ($149/mo or $1,490/yr) with BackgroundGradient |
| 11 | FAQ | Default bg | Accordion-style Q&A (5 items) |
| 12 | Final CTA | Cosmic glow bg | Dual CTAs matching hero |

### Technical Details

**New file**: `src/pages/SphereSync.tsx`
- Uses existing components: Header, FooterMinimal, Button, Card, Badge, BackgroundGradient, LightRays, Accordion
- Scroll-triggered fade-in animations via IntersectionObserver (same `useInView` pattern as ProfessionalPractice)
- Framer Motion for step cards stagger
- All CTA buttons link to `#` (placeholder) in new tab
- "Watch the Overview" links to `#` as placeholder
- Includes Navigation (Header component)

**Modified files**:
- `src/App.tsx` — add route `/spheresync`
- `src/components/Navigation.tsx` — add "SphereSync" nav link

**Design**:
- Alternating section backgrounds (default / `bg-primary/5`)
- Primary teal highlights for key phrases
- Icons from lucide-react for feature grid and steps
- Responsive: single column mobile, 2-3 col grids on desktop
- SEO component with SphereSync-specific meta tags

### CTA Behavior
- Primary CTAs → `href="#"` with `target="_blank"` (placeholder for checkout URL)
- "Watch the Overview" → `href="#"` (placeholder for video)
- Multiple CTA placements throughout (after sections 2, 3, 4, 5, 6, 7, 8, 9, and final)

