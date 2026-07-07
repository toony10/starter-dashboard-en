"use client"

import { useSearchParams } from "next/navigation"
import { SearchFilter } from "@/components/shared/filters/SearchFilter"
import { MainH, SectionH } from "@/components/shared/text/Headings"
import { FILTER_URL_UPDATE_DELAY_MS } from "@/config/constants"

function SearchParamsPreview() {
  const searchParams = useSearchParams()
  const entries = Array.from(searchParams.entries())

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No search params set yet. Type in the search field above to update the URL.
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

export default function SearchFilterPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Search Filter"
        description="Text search that syncs the query to URL search params with debounced updates."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-3">
          <SectionH
            title="Default query"
            description='Writes to the "q" search param by default.'
          />
          <SearchFilter placeholder="Search products..." />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Custom param key"
            description='Writes to the "name" search param when paramKey is set.'
          />
          <SearchFilter
            paramKey="name"
            placeholder="Search by name..."
          />
        </section>
      </div>

      <section className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
        <SectionH
          title="Current search params"
          description={`URL updates are debounced by ${FILTER_URL_UPDATE_DELAY_MS}ms after each keystroke.`}
        />
        <SearchParamsPreview />
      </section>
    </div>
  )
}
