

## Add Logos to Blue Jay Properties Hero Section

### What
Add the three brand logos (Blue Jay Properties, Keller Williams, Real Estate on Purpose) to the hero section of `/join/blue-jay-properties`, displayed as a horizontal row above the headline.

### Steps

1. **Copy uploaded logos to `src/assets/logos/`**
   - `BLUE_JAY.png` → `src/assets/logos/blue-jay-properties.png`
   - `Keller-Williams-logo.png` → `src/assets/logos/keller-williams.png`
   - REOP logo already exists at `public/images/reop-logo-compact.png`

2. **Update `src/pages/JoinBlueJay.tsx`**
   - Import the two new logos and the REOP logo
   - Add a logo row in the hero section (before the subtitle text), showing all three logos side by side with subtle separators or spacing
   - Logos displayed on a white/light rounded container so they're visible against the dark hero background
   - Responsive sizing: ~120-160px wide on desktop, smaller on mobile
   - Layout: `flex items-center justify-center gap-6 md:gap-10` with the logos centered

### Visual layout
```text
┌─────────────────────────────────────┐
│     [Blue Jay]  [KW]  [REOP]       │
│                                     │
│  Real Estate Agent Opportunity...   │
│  Join Blue Jay Properties Group     │
│  Keller Williams Capital Properties │
│  Hiring & Onboarding by REOP™      │
└─────────────────────────────────────┘
```

