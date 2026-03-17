

## Add GTM, GA4, and Clarity tracking to all pages

Since this is a single-page app, all tracking scripts go in `index.html` once and they'll run on every page.

### Changes to `index.html`

**In `<head>` (before the closing `</head>`):**
1. GTM head snippet (`GTM-WNCHZB45`)
2. GA4 gtag.js snippet (`G-0XTL0R6Q98`)
3. Microsoft Clarity snippet (`vx9tje0e7c`)

**In `<body>` (immediately after `<body>` tag):**
1. GTM noscript/iframe fallback

Single file change, no component modifications needed.

