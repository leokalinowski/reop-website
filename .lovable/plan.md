

## Prepend +1 to US Phone Numbers in submit-agent-application

### What
Normalize phone numbers in the `submit-agent-application` edge function so they always include the `+1` country code before storing and sending to the webhook.

### Change

**`supabase/functions/submit-agent-application/index.ts`**

After sanitizing the phone value (~line 62), add normalization logic:
- Strip all non-digit characters from the phone string
- If the result is 10 digits, prepend `+1`
- If it's 11 digits starting with `1`, prepend `+`
- Otherwise keep as-is (already international or non-US)

Store the normalized phone in the database record and send it in the webhook payload.

```typescript
// After: const phone = sanitize(body.phone);
let normalizedPhone = phone.replace(/\D/g, '');
if (normalizedPhone.length === 10) {
  normalizedPhone = '+1' + normalizedPhone;
} else if (normalizedPhone.length === 11 && normalizedPhone.startsWith('1')) {
  normalizedPhone = '+' + normalizedPhone;
} else {
  normalizedPhone = phone; // keep original
}
```

Then use `normalizedPhone` in both the `record` object and the webhook payload instead of `phone`.

### Scope
- One file changed: `supabase/functions/submit-agent-application/index.ts`
- Edge function redeployed automatically

