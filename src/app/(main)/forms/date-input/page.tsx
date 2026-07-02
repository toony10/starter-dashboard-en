"use client"

import { format } from "date-fns"
import { useState } from "react"
import { DateInput } from "@/components/shared/forms/DateInput"
import { MainH, SectionH } from "@/components/shared/text/Headings"
import { Button } from "@/components/ui/button"

function ValuePreview({ value }: { value: Date | undefined }) {
  if (!value) {
    return (
      <p className="text-sm text-muted-foreground">No date selected.</p>
    )
  }

  return (
    <dl className="grid gap-2 text-sm">
      <div className="flex gap-2">
        <dt className="font-medium text-muted-foreground">Local:</dt>
        <dd className="font-mono">{ format(value, "PPP p") }</dd>
      </div>
      <div className="flex gap-2">
        <dt className="font-medium text-muted-foreground">ISO:</dt>
        <dd className="font-mono break-all">{ value.toISOString() }</dd>
      </div>
    </dl>
  )
}

export default function DateInputPage() {
  const [controlled, setControlled] = useState<Date | undefined>()
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Date Input"
        description="Form-ready date and time picker with calendar, time controls, and optional hidden field support."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-3">
          <SectionH
            title="Date & time"
            description="Default 12-hour picker with hour, minute, and AM/PM controls."
          />
          <DateInput placeholder="Schedule an event" />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Date only"
            description="Calendar-only selection without the time panel."
          />
          <DateInput withTime={ false } placeholder="Pick a date" />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="With seconds"
            description="12-hour clock with seconds and AM/PM."
          />
          <DateInput
            showSeconds
            placeholder="Pick date and time"
          />
        </section>

        <section className="flex flex-col gap-3">
          <SectionH
            title="Min / max range"
            description="Only dates within the next 30 days are selectable."
          />
          <DateInput
            minDate={ new Date() }
            maxDate={ new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
            placeholder="Within 30 days"
          />
        </section>
      </div>

      <section className="flex flex-col gap-3">
        <SectionH
          title="Controlled"
          description="Uses value and onChange to keep selection in React state."
        />
        <DateInput
          value={ controlled }
          onChange={ setControlled }
          placeholder="Controlled picker"
        />
        <div className="rounded-lg border bg-muted/30 p-4">
          <ValuePreview value={ controlled } />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionH
          title="Native form submit"
          description='Uses the optional name prop to submit an ISO datetime via a hidden input.'
        />
        <form
          className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4"
          onSubmit={ (event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            setSubmitted(String(data.get("eventAt") ?? ""))
          } }
        >
          <DateInput
            name="eventAt"
            required
            placeholder="Event date & time"
          />
          <Button type="submit" className="w-fit">
            Submit form
          </Button>
        </form>
        { submitted !== null ? (
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="mb-2 text-sm font-medium">Submitted value</p>
            <p className="font-mono text-sm break-all">{ submitted || "(empty)" }</p>
          </div>
        ) : null }
      </section>
    </div>
  )
}
