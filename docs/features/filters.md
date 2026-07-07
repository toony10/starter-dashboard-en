# Filters Feature

## Purpose

The filters module demonstrates composable controls that synchronize state with URL query parameters, making views shareable and navigable.

## Routes

- `/filters`
- `/filters/pagination`
- `/filters/select`
- `/filters/multiple-select`
- `/filters/tabs`
- `/filters/date`
- `/filters/search`
- `/filters/limit`
- `/filters/reset`

## Included capabilities

- Search query synchronization.
- Single and multi-select filtering.
- Tab-based segmentation.
- Date-based filtering.
- Page-size limiting and pagination controls.
- One-click reset for selected params.

## Primary building blocks

- `SearchFilter`
- `SelectFilter`
- `MultipleSelectFilter`
- `TabsFilter`
- `DateFilter`
- `LimitFilter`
- `Pagination`
- `ResetFilters`

## Technical notes

Filter updates are debounced and URL-driven to support refresh-safe state and deep-linking behavior.
