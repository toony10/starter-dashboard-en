"use client"

import { useSearchParams } from "next/navigation"
import { LimitFilter } from "@/components/shared/filters/LimitFilter"
import { MainH, SectionH } from "@/components/shared/text/Headings"
import { FILTER_URL_UPDATE_DELAY_MS } from "@/config/constants"

function SearchParamsPreview() {
  const searchParams = useSearchParams()
  const entries = Array.from(searchParams.entries())

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No search params set yet. Pick a limit above to update the URL.
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

export default function LimitFilterPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Limit Filter"
        description="Select how many rows to show per page, synced to URL search params with debounced updates."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-3">
          <SectionH
            title="Default limit"
            description='Writes to the "limit" search param by default.'
          />
          <LimitFilter />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Custom options"
            description='Writes to the "perPage" search param with a custom set of values.'
          />
          <LimitFilter
            paramKey="perPage"
            options={ [5, 15, 30, 60] }
            defaultLimit={ 15 }
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
