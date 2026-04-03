

## Add Guarantee Messaging to Offer Section

Two text additions to `src/pages/FoundingTable.tsx`:

### 1. Full guarantee statement — between CTA button and scarcity bar (lines 335-337)

After the CTA button and its "Text Pam" subtext (line 337), and before the scarcity bar (line 322), insert a styled guarantee paragraph. Looking at the flow more carefully: the CTA button at line 334 is **after** the scarcity bar. The user said "between the button and the scarcity bar" in the **offer section**.

The offer section ends at line 301. The next CTA button is at line 334. The scarcity bar is at line 322. So the order is: offer card → For/Not For → scarcity → CTA button.

The user likely wants:
1. The guarantee quote **between the CTA button (line 335) and the scarcity bar (line 322)** — so inserted right after the scarcity bar and before the CTA, or right before the scarcity bar after the CTA. Given the user said "between the button and the scarcity bar," and looking at the visual flow, I'll insert it between the CTA button block and the scarcity block. But the scarcity comes before the CTA in the code. So: insert between scarcity (line 331) and CTA2 (line 333).

2. The brief line "And if it's not right for you, we'll make it right." — at the bottom of the offer card, after the "offer-after" div (line 298), still inside the offer card.

### Changes

**Inside the offer card** (after line 298, before closing `</div>` tags):
- Add a brief italic line: "And if it's not right for you, we'll make it right."
- Style it similarly to `offer-after` — muted, smaller text.

**Between scarcity bar and CTA2** (between lines 331 and 333):
- Add the full guarantee quote in a styled block (italic, slightly smaller, with subtle left border or similar editorial styling matching the page).
- Text: "If you complete your Sphere Opportunity Audit and do 85% of your first four Rolling Audits and don't feel like this is working for you — I'll refund every penny. No questions, no guilt. I'm that confident in what we've built."

### Files
- `src/pages/FoundingTable.tsx` — two insertions
- `src/pages/FoundingTable.css` — add a `.guarantee-block` style if needed (italic, border-left, padding)

