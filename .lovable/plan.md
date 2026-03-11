

## Update APPLY_URL to Stripe Payment Link

Single-line change in `src/pages/SphereSyncFounders.tsx` line 33:

Replace `const APPLY_URL = '#';` with `const APPLY_URL = 'https://buy.stripe.com/14A4gBgz08mGgCx2js0x200';`

All CTA buttons already use this constant with `target="_blank" rel="noopener noreferrer"`, so every "Apply for Founder Access" button on the page will immediately link to the Stripe checkout.

