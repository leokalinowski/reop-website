

## Recommendation: Send Affiliates to `/spheresync-founders` (Founding Table)

### The short answer
Send your GHL affiliate links to **`https://realestateonpurpose.com/spheresync-founders`** — your dedicated Founding Table sales page — NOT directly to the Stripe checkout URL.

### Why not send them straight to Stripe?
GHL is set up to track External Website conversions and append `?am_id=<<affiliate_id>>` to the destination URL. If you send affiliates directly to `https://buy.stripe.com/14A4gBgz08mGgCx2js0x200?am_id=xxx`:
- Cold traffic almost never buys from a bare Stripe page (no story, no trust, no urgency)
- Conversion rates on direct-to-checkout from cold affiliate traffic are typically 1-3% vs. 8-15% from a proper sales page
- You lose the chance to qualify, build belief, and present the full offer

### Why `/spheresync-founders` is the right destination
1. **It's already a complete sales page** — countdown timer, founder cohort framing, pricing, social proof, CTAs — all built specifically for this $997 Founding offer
2. **It's distraction-free** — no main site navigation, so traffic stays on the conversion path
3. **The CTAs already point to the correct Stripe URL** (`https://buy.stripe.com/14A4gBgz08mGgCx2js0x200`) — we just need to make sure `am_id` survives the journey
4. **It matches your offer in GHL** — "Affiliate Program - Founders Core" maps perfectly to the Founders landing page

### The one technical fix needed: persist `am_id` to Stripe
Right now the page's CTA buttons link to the bare Stripe URL. If a visitor lands at `/spheresync-founders?am_id=AFF123` and clicks "Apply for Founder Access," the `am_id` gets dropped — breaking GHL attribution.

We need to update both Founders pages to:
1. Read `am_id` (and any UTM params) from the URL on page load
2. Append it to every Stripe CTA link before the click

**Files to update:**
- `src/pages/FoundingTable.tsx` (mounted at `/spheresync-founders` — your primary destination)
- `src/pages/SphereSyncFounders.tsx` (mounted at `/spheresync-founders-1` — backup variant)

**Implementation:**
- Add a small `useStripeUrlWithAffiliate()` hook that reads `am_id` from `window.location.search` and returns the Stripe URL with the param appended
- Replace the hardcoded `APPLY_URL` references in CTAs with the hook's return value
- Optional: also persist `am_id` in `sessionStorage` so it survives in-page navigation

### What to set in GHL
In your "External Website" field:
```
https://realestateonpurpose.com/spheresync-founders
```
GHL will automatically append `?am_id=<<affiliate_id>>` and produce the link affiliates copy.

### Bonus: optional tracking improvement
If you want server-side confirmation that a particular affiliate drove a sale (independent of GHL's pixel), we could log `am_id` into a Supabase `affiliate_clicks` table when the page loads. This isn't required — GHL handles attribution on its end — but it gives you a reliable internal record. Happy to scope it as a follow-up.

### Summary of what I'd build (if you approve)
1. Create a `useStripeCheckoutUrl` hook that preserves `am_id` (and UTMs)
2. Wire it into all "Apply for Founder Access" / pricing CTAs in `FoundingTable.tsx` and `SphereSyncFounders.tsx`
3. You then paste `https://realestateonpurpose.com/spheresync-founders` into the GHL External Website field

