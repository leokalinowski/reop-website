

## Landing Page: "The Professional Practice"

### Overview
A high-impact, conversion-focused landing page for high-performing real estate agents ready to transition from solo operators to professional practice founders. The page will follow the existing design system (teal/dark theme, cosmic effects) while introducing elevated typography, strategic whitespace, and subtle motion to let the messaging shine.

### Page Structure

The page will have 5 distinct sections, each with its own visual rhythm:

**1. Hero Section** -- Full viewport, commanding presence
- Large typographic headline with the key phrase "Professional Practice" highlighted in primary color
- Subheadline as a personal, empathetic statement ("You've reached a point where your talent is outpacing your time")
- Subtle LightRays background on desktop, cosmic gradient on mobile
- No CTA button in hero -- let the message breathe and pull readers down
- Gentle fade-in animation on load

**2. "The Management Trap" Section** -- The Problem
- Dark background section (bg-primary/5) for contrast
- Bold headline: "The Reality of the Management Trap"
- Two-column layout on desktop: left side has the problem copy, right side has a visual "Peak Friction" indicator (animated progress bar or stylized graphic showing friction building up)
- Key phrase "Peak Friction" styled as a highlighted term
- Closing statement as an italicized callout: "We believe real estate is evolving..."

**3. "The Pathway" Section** -- The Solution (4 pillars)
- Clean white/background section
- Headline: "The Pathway to a Transferable Business"
- Four cards in a vertical timeline-style layout (not grid) to show progression:
  1. The Foundation -- Agent Ops HQ (with icon)
  2. The Workflow -- SphereSync (with icon)
  3. The Talent Pathway -- tiered structure (with icon)
  4. The Focus -- high-level strategy (with icon)
- Each card has a subtle staggered entrance animation
- Connecting line between cards to suggest progression
- Uses existing Card and BackgroundGradient components

**4. "The Vision" Section** -- Emotional close
- Full-width section with centered text and generous whitespace
- Italic headline: "Just imagine a practice that outlasts your personal energy."
- Soft, qualifying language: "I'm not sure if it's for you..."
- Builds exclusivity and curiosity

**5. CTA Section** -- Single clear action
- Prominent button: "Schedule a Strategic Diagnostic"
- Descriptive subtext about what the 15-minute call covers
- Cosmic glow background effect behind the button
- LeadCaptureForm integration (or external booking link)

### Technical Details

**New file**: `src/pages/ProfessionalPractice.tsx`
- Self-contained page component
- Uses existing components: Header, FooterMinimal, Button, Card, Badge, BackgroundGradient, LightRays, LeadCaptureForm
- Intersection Observer for scroll-triggered animations (same pattern as ProblemSection, ValueProposition)
- Framer Motion for staggered card entrances in the Pathway section

**Route**: `/professional-practice`
- Added to `src/App.tsx` routes
- Added to Navigation links array in `src/components/Navigation.tsx`

**Design tokens used**:
- Primary teal (#00a2ad) for accent text and highlights
- Existing cosmic-grid, cosmic-glow, cosmic-card classes
- text-foreground, text-muted-foreground for body hierarchy
- tracking-tighter for headlines, text-balance for readability

**Animations**:
- Hero: fade-in with translateY on load (300ms delay, same as HeroSection)
- Pathway cards: staggered fade-in using Intersection Observer (200ms delay between each)
- CTA button: subtle pulse animation that stops on hover
- Section transitions: each section fades in when scrolled into view

**Responsive behavior**:
- Mobile: single column, reduced padding, no LightRays (cosmic gradient fallback)
- Tablet: 2-column where applicable
- Desktop: full layout with visual effects

**CTA behavior**: The "Schedule a Strategic Diagnostic" button will link to the existing Pam booking page (`https://lp.realestateonpurpose.com/appointmentwithreop`) in a new tab, keeping the page simple and direct.

### Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/ProfessionalPractice.tsx` | Create | New landing page component |
| `src/App.tsx` | Modify | Add route `/professional-practice` |
| `src/components/Navigation.tsx` | Modify | Add nav link |

