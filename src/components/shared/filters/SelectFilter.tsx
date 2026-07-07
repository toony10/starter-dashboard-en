"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FILTER_URL_UPDATE_DELAY_MS } from "@/config/constants"
import { debounce, parseAsString, useQueryState } from "nuqs"
const ALL_VALUE = "__all__"

export type SelectFilterOption = {
  label: string
  value: string
}

export interface SelectFilterProps {
  paramKey: string
  options: SelectFilterOption[]
  allOpt?: boolean
  placeholder?: string
  className?: string
}

export function SelectFilter({
  paramKey,
  options,
  allOpt = true,
  placeholder = "Choose an option",
  className,
}: SelectFilterProps) {
  const [value, setValue] = useQueryState(
    paramKey,
    parseAsString.withDefault("").withOptions({
      limitUrlUpdates: debounce(FILTER_URL_UPDATE_DELAY_MS),
      clearOnDefault: true,
    }),
  )

  const selectValue = value || undefined

  return (
    <Select
      key={ `${paramKey}:${value || "__empty__"}` }
      value={ selectValue }
      onValueChange={ (next) => {
        setValue(next === ALL_VALUE ? null : next, {
          limitUrlUpdates: debounce(FILTER_URL_UPDATE_DELAY_MS),
        })
      } }
    >
      <SelectTrigger className={ cn("w-full min-w-40", className) }>
        <SelectValue placeholder={ placeholder } />
      </SelectTrigger>
      <SelectContent>
        { allOpt ? (
          <SelectItem value={ ALL_VALUE }>All</SelectItem>
        ) : null }
        { options.map((option) => (
          <SelectItem key={ option.value } value={ option.value }>
            { option.label }
          </SelectItem>
        )) }
      </SelectContent>
    </Select>
  )
}
