"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { debounce, parseAsInteger, useQueryState } from "nuqs"

const DEBOUNCE_MS = 600

const DEFAULT_LIMIT_OPTIONS = [10, 20, 30, 40, 50]

export interface LimitFilterProps {
  paramKey?: string
  options?: number[]
  defaultLimit?: number
  placeholder?: string
  className?: string
}

export function LimitFilter({
  paramKey = "limit",
  options = DEFAULT_LIMIT_OPTIONS,
  defaultLimit = DEFAULT_LIMIT_OPTIONS[0],
  placeholder = "Rows per page",
  className,
}: LimitFilterProps) {
  const [limit, setLimit] = useQueryState(
    paramKey,
    parseAsInteger.withDefault(defaultLimit).withOptions({
      limitUrlUpdates: debounce(DEBOUNCE_MS),
      clearOnDefault: true,
    }),
  )

  return (
    <Select
      value={ String(limit) }
      onValueChange={ (next) => {
        setLimit(Number(next), {
          limitUrlUpdates: debounce(DEBOUNCE_MS),
        })
      } }
    >
      <SelectTrigger className={ cn("w-full min-w-40", className) }>
        <SelectValue placeholder={ placeholder } />
      </SelectTrigger>
      <SelectContent>
        { options.map((option) => (
          <SelectItem key={ option } value={ String(option) }>
            { option }
          </SelectItem>
        )) }
      </SelectContent>
    </Select>
  )
}
