

## Fix: Duplicated text in VSL section heading

**File:** `src/pages/SphereSyncFounders.tsx`, lines 558-560

**Current (broken):**
```
See why agents lose business from their sphere
and how SphereSync fixes it<span class="text-primary"> SphereSync</span> fixes it
```

**Fixed to:**
```
See why agents lose business from their sphere — and how <span class="text-primary">SphereSync fixes it</span>
```

Single line edit replacing the duplicated text with an em dash and wrapping only "SphereSync fixes it" in the primary color span.

