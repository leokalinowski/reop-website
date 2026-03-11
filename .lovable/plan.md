

## Update Navigation Menu

Remove "Events", "Resources", "Jump Start", and "Professional Practice" from the navigation links in `src/components/Navigation.tsx`.

The `navLinks` array (lines 12-18) will be reduced to:
- Home (`/`)
- Blog (`/blog`)
- SphereSync (`/spheresync`)

No other files need changes — the routes remain accessible via direct URL, just hidden from nav.

