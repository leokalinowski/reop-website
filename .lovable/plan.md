

## Conversion Copy Overhaul — AffiliateSales.tsx

Targeted edits to reposition around **recurring revenue**, de-emphasize the $997 one-time founding offer, and improve clarity/conversions. No structural teardown — same sections, improved copy and one new earnings table.

---

### 1. Constants & SEO (top of file)

- Add a `MONTHLY_PRICE = 97` constant (or similar recurring price) to power the earnings math
- Update SEO title: "Become a SphereSync Affiliate | Earn 20% Recurring Revenue"
- Update SEO description to lead with recurring revenue, not one-time payout

### 2. Hero Section

**Current**: "Earn $199 for Every Agent You Refer"
**New headline**: "Earn 20% Recurring Revenue on Every Referral"
**New subhead**: "Refer agents to SphereSync. When they stay, you keep earning — 20% of their subscription, every month, for life." Remove the $997 product price from the hero entirely. Keep CTA button as-is.

### 3. How It Works — Simplify to 3 clean steps

Update the `steps` array:
1. **Share** — "Share your unique affiliate link with your audience."
2. **They Join** — "When someone signs up for SphereSync through your link, you get credit."
3. **You Earn** — "Earn 20% of their subscription — every month they stay."

Remove mention of dollar amounts from this section. Keep it about the *model*.

### 4. "The Numbers" → Rename to "Your Earnings Potential"

Replace the 3-stat grid (Product Price / Commission % / Per Referral) with an **earnings example table** showing monthly and annual potential:

| Referrals | Monthly Income | Annual Income |
|-----------|---------------|---------------|
| 5         | ~$97          | ~$1,164       |
| 10        | ~$194         | ~$2,328       |
| 25        | ~$485         | ~$5,820       |
| 50        | ~$970         | ~$11,640      |

*(Numbers based on 20% of a ~$97/mo subscription. Exact amounts depend on plan.)*

Keep `bg-slate-900` dark band. Add a small note: "This is recurring. Your income grows as long as your referrals stay — and SphereSync is built for long-term members, not one-time buyers."

### 5. Add new section: "Founding Bonus" (after earnings table)

A small, secondary callout — NOT a full section. A single card/banner:
- "**Limited-Time Founding Bonus**: The first 50 affiliates also earn $199 per one-time Founding Table sale ($997). This is in addition to your ongoing recurring commissions."
- Keep it visually subordinate (smaller text, `bg-muted` card, no dark band)

### 6. "What You Get" → Rename to "Why This Is Easy to Promote"

Replace bullet list with more conversion-focused reasons:
- "Clear niche — built exclusively for real estate agents"
- "Strong product-market fit — agents need this, and they know it"
- "Recurring revenue model — you earn as long as they stay"
- "High customer lifetime value — SphereSync is a system, not a tool they churn from"
- "Marketing assets, tracking dashboard, and dedicated affiliate support"

### 7. "Who It's For" — Minor copy polish

Update audience card descriptions to reference recurring income instead of generic "earn commissions":
- Coaches: "Recommend SphereSync and earn recurring revenue while you teach."
- Influencers: "Monetize your real estate audience with compounding monthly income."
- Community Leaders: "Help your network level up — and build a recurring income stream."
- Current Members: "Already love SphereSync? Share it and earn every month."

### 8. Final CTA — Tighten copy

**Current**: "Ready to Start Earning?" / "Apply today and start earning $199..."
**New**: "Ready to Build Recurring Income?" / "Apply today. Every referral earns you 20% — every month, for as long as they're a member."

Button text stays: "Apply for the Affiliate Program"

---

### Technical notes

- Single file edit: `src/pages/AffiliateSales.tsx`
- Add `TrendingUp` or `Repeat` icon import from lucide-react for the earnings/recurring theme
- Earnings table rendered as a simple styled grid (no new components needed)
- Founding bonus rendered as a `bg-muted border border-border rounded-xl` card
- All existing brand tokens preserved (`bg-background`, `text-foreground`, `text-primary`, `bg-slate-900`)

