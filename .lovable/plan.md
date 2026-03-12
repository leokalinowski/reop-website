

## Tighten Section Spacing

Most sections use `py-20 md:py-28` (80px / 112px) vertical padding. A few use `py-24 md:py-32`. The Database Gap and Inaction Cost sections already use the tighter `py-14 md:py-20`.

### Plan

Reduce vertical padding across all sections in `src/pages/SphereSyncFounders.tsx`:

| Current | New | Applied to |
|---------|-----|------------|
| `py-20 md:py-28` | `py-12 md:py-16` | Sections 4, 6, 7, 9, 10, 10b, 11, 12, 13, 14, 15 |
| `py-14 md:py-20` | `py-10 md:py-14` | Sections 2, 3 |
| `py-12 md:py-16` | `py-8 md:py-12` | Section 8 (Rally Line — already tighter) |
| `py-24 md:py-32` | `py-16 md:py-20` | Section 17 (Final CTA) |

Also reduce `SectionCTA` top padding from `pt-8` → `pt-4`.

This cuts ~40% of the inter-section whitespace while keeping breathing room. All changes are find-and-replace within the single file.

