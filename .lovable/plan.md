

## Replace Webhook in submit-affiliate Edge Function

**What**: Remove the existing GHL webhook call and replace it with a single call to the LeadConnector webhook URL.

**File**: `supabase/functions/submit-affiliate/index.ts`

**Changes**:
- Remove the GHL webhook block (~lines 96-125) that reads `GHL_WEBHOOK_URL` from env and posts to it
- Replace with a single fire-and-forget fetch to the hardcoded URL: `https://services.leadconnectorhq.com/hooks/EvF7HNDSZUqlgzPqnfwz/webhook-trigger/pLQyKHlOX1SrqDitnz2n`
- Same payload structure (name, email, phone, tags, source, custom fields)
- No env variable needed — URL is hardcoded as a public webhook endpoint

No other files change. Function will be redeployed after edit.

