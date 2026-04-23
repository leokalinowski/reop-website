## Remove April 22nd Date Reference

### What
Remove all references to "April 22nd" from the website. Found one occurrence in the Founding Table page.

### Change

**`src/pages/FoundingTable.tsx`** (line 331)

Update the scarcity subtext to remove the specific date reference while maintaining urgency messaging.

**Before:**
```
I'm introducing SphereSync publicly on April 22nd. I wanted you to have a seat before the room finds out it exists. Founding Table seats close April 22nd — or when all 50 are filled.
```

**After:**
```
I'm introducing SphereSync publicly soon. I wanted you to have a seat before the room finds out it exists. Founding Table seats are limited — when all 50 are filled, that's the table.
```

### Scope
- One file changed: `src/pages/FoundingTable.tsx`