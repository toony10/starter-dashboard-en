"use client"

import { useSearchParams } from "next/navigation"
import { LimitFilter } from "@/components/shared/filters/LimitFilter"
import { Pagination } from "@/components/shared/filters/Pagination"
import { ResetFilters } from "@/components/shared/filters/ResetFilters"
import { SearchFilter } from "@/components/shared/filters/SearchFilter"
import { SelectFilter } from "@/components/shared/filters/SelectFilter"
import { MainH, SectionH } from "@/components/shared/text/Headings"

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
]

const FILTER_KEYS = ["q", "status", "limit", "page"]

function SearchParamsPreview() {
  const searchParams = useSearchParams()
  const entries = Array.from(searchParams.entries())

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No search params set yet. Change a filter above to update the URL.
      </p>
    )
  }

  return (
    <dl className="grid gap-2 text-sm">
      { entries.map(([key, value]) => (
        <div key={ key } className="flex gap-2">
          <dt className="font-medium text-muted-foreground">{ key }:</dt>
          <dd className="font-mono">{ value }</dd>
        </div>
      )) }
    </dl>
  )
}

export default function ResetFiltersPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Reset Filters"
        description="Clear selected search params from the URL in one action."
      />

      <section className="flex flex-col gap-4">
        <SectionH
          title="Filter toolbar"
          description='Reset removes "q", "status", "limit", and "page" from the URL.'
        />
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex min-w-48 flex-1 flex-col gap-2">
            <span className="text-sm font-medium">Search</span>
            <SearchFilter placeholder="Search products..." />
          </div>
          <div className="flex min-w-40 flex-col gap-2">
            <span className="text-sm font-medium">Status</span>
            <SelectFilter
              paramKey="status"
              options={ statusOptions }
              placeholder="Filter by status"
            />
          </div>
          <div className="flex min-w-32 flex-col gap-2">
            <span className="text-sm font-medium">Limit</span>
            <LimitFilter />
          </div>
          <ResetFilters keys={ FILTER_KEYS } />
        </div>
        <Pagination pages={ 10 } />
      </section>

      <section className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
        <SectionH
          title="Current search params"
          description="Reset is disabled until at least one managed param is present."
        />
        <SearchParamsPreview />
      </section>
    </div>
  )
}
