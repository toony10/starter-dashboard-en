"use client"

import { useSearchParams } from "next/navigation"
import { MultipleSelectFilter } from "@/components/shared/filters/MultipleSelectFilter"
import { MainH, SectionH } from "@/components/shared/text/Headings"
import { FILTER_URL_UPDATE_DELAY_MS } from "@/config/constants"

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

const tagOptions = [
  { label: "Featured", value: "featured" },
  { label: "On sale", value: "on-sale" },
  { label: "New arrival", value: "new" },
  { label: "Limited", value: "limited" },
]

function SearchParamsPreview() {
  const searchParams = useSearchParams()
  const entries = Array.from(searchParams.entries())

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No search params set yet. Pick values above to update the URL.
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

export default function MultipleSelectFilterPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Multiple Select Filter"
        description="Dropdown filters that sync multiple selected values to URL search params as comma-separated lists."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-3">
          <SectionH
            title="Status"
            description='Writes to the "status" param, e.g. status=active,pending.'
          />
          <MultipleSelectFilter
            paramKey="status"
            options={ statusOptions }
            placeholder="Filter by status"
          />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Category"
            description='Writes to the "category" param, e.g. category=electronics,books.'
          />
          <MultipleSelectFilter
            paramKey="category"
            options={ categoryOptions }
            placeholder="Filter by category"
          />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Tags"
            description='Writes to the "tags" param, e.g. tags=featured,new,on-sale.'
          />
          <MultipleSelectFilter
            paramKey="tags"
            options={ tagOptions }
            placeholder="Filter by tags"
          />
        </section>
      </div>

      <section className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
        <SectionH
          title="Current search params"
          description={`URL updates are debounced by ${FILTER_URL_UPDATE_DELAY_MS}ms after each selection.`}
        />
        <SearchParamsPreview />
      </section>
    </div>
  )
}
