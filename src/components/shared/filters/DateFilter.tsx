"use client"

import { format, isValid, parseISO } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { debounce, parseAsString, useQueryState } from "nuqs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const DEBOUNCE_MS = 600

function toISOParam(date: Date): string {
  return date.toISOString()
}

function fromISOParam(value: string): Date | undefined {
  const parsed = parseISO(value)
  return isValid(parsed) ? parsed : undefined
}

export interface DateFilterProps {
  paramKey: string
  placeholder?: string
  className?: string
}

export function DateFilter({
  paramKey,
  placeholder = "Pick a date",
  className,
}: DateFilterProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = useQueryState(
    paramKey,
    parseAsString.withDefault("").withOptions({
      limitUrlUpdates: debounce(DEBOUNCE_MS),
      clearOnDefault: true,
    }),
  )

  const selectedDate = value ? fromISOParam(value) : undefined

  return (
    <Popover open={ open } onOpenChange={ setOpen }>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={ cn(
            "w-full min-w-40 justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className,
          ) }
        >
          <CalendarIcon />
          { selectedDate ? format(selectedDate, "PPP") : placeholder }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={ selectedDate }
          onSelect={ (date) => {
            setValue(date ? toISOParam(date) : null, {
              limitUrlUpdates: debounce(DEBOUNCE_MS),
            })
            setOpen(false)
          } }
        />
      </PopoverContent>
    </Popover>
  )
}
