# Guide: State and URL Filters

## Why URL-synced filters

URL-based state enables:

- Shareable links with active filters.
- Refresh-safe UI state.
- Better browser back/forward behavior.

## Current implementation pattern

- Filter components update query params.
- Related pages read values from URL state.
- Reset controls remove selected parameters.

## Practical recommendations

- Use stable query key names per module.
- Debounce text-based filters.
- Keep defaults explicit and documented.
- Avoid storing duplicate state in local component state when URL is source of truth.

## Related files

- `src/components/shared/filters/*`
- `src/config/constants.ts`
