"use client"

import { useSearchParams } from "next/navigation"
import { DateFilter } from "@/components/shared/filters/DateFilter"
import { ResetFilters } from "@/components/shared/filters/ResetFilters"
import { MainH, SectionH } from "@/components/shared/text/Headings"
import { FILTER_URL_UPDATE_DELAY_MS } from "@/config/constants"

function SearchParamsPreview() {
  const searchParams = useSearchParams()
  const entries = Array.from(searchParams.entries())

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No search params set yet. Pick a date above to update the URL.
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

export default function DateFilterPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Date Filter"
        description="Date picker filters that sync selected dates to URL search params in ISO format."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-3">
          <SectionH
            title="From"
            description='Writes to the "from" search param as an ISO datetime (e.g. 2026-07-03T14:21:46.707Z).'
          />
          <DateFilter paramKey="from" placeholder="Start date" />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="To"
            description='Writes to the "to" search param as an ISO datetime (e.g. 2026-07-03T14:21:46.707Z).'
          />
          <DateFilter paramKey="to" placeholder="End date" />
        </section>
      </div>

      <div className="flex items-center gap-3">
        <ResetFilters keys={ ["from", "to"] } />
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
