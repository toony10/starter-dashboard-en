"use client"

import { useSearchParams } from "next/navigation"
import { SelectFilter } from "@/components/shared/filters/SelectFilter"
import { MainH, SectionH } from "@/components/shared/text/Headings"

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
  { label: "Archived", value: "archived" },
]

const categoryOptions = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Books", value: "books" },
  { label: "Home & Garden", value: "home-garden" },
]

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Name A–Z", value: "name-asc" },
  { label: "Name Z–A", value: "name-desc" },
]

function SearchParamsPreview() {
  const searchParams = useSearchParams()
  const entries = Array.from(searchParams.entries())

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No search params set yet. Pick a value above to update the URL.
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

export default function SelectFilterPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Select Filter"
        description="Dropdown filters that sync selected values to URL search params with debounced updates."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-3">
          <SectionH
            title="Status"
            description='Writes to the "status" search param.'
          />
          <SelectFilter
            paramKey="status"
            options={ statusOptions }
            placeholder="Filter by status"
          />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Category"
            description='Writes to the "category" search param.'
          />
          <SelectFilter
            paramKey="category"
            options={ categoryOptions }
            placeholder="Filter by category"
          />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Sort order"
            description='Writes to the "sort" search param.'
          />
          <SelectFilter
            paramKey="sort"
            options={ sortOptions }
            placeholder="Sort by"
          />
        </section>
      </div>

      <section className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
        <SectionH
          title="Current search params"
          description="URL updates are debounced by 600ms after each selection."
        />
        <SearchParamsPreview />
      </section>
    </div>
  )
}
