"use client"

import { useSearchParams } from "next/navigation"
import { TabsFilter } from "@/components/shared/filters/TabsFilter"
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

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
]

function SearchParamsPreview() {
  const searchParams = useSearchParams()
  const entries = Array.from(searchParams.entries())

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No search params set yet. Pick a tab above to update the URL.
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

export default function TabsFilterPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Tabs Filter"
        description="Tabbed filters that sync the selected option to URL search params with a smooth sliding indicator."
      />

      <div className="grid gap-8">
        <section className="flex flex-col gap-3">
          <SectionH
            title="Status"
            description='Writes to the "status" search param. "All" clears the filter.'
          />
          <TabsFilter paramKey="status" options={ statusOptions } />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Category"
            description='Writes to the "category" search param.'
          />
          <TabsFilter paramKey="category" options={ categoryOptions } />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Priority"
            description='Writes to the "priority" search param.'
          />
          <TabsFilter paramKey="priority" options={ priorityOptions } />
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
