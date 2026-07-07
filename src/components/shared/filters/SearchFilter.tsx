"use client"

import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { FILTER_URL_UPDATE_DELAY_MS } from "@/config/constants"
import { debounce, parseAsString, useQueryState } from "nuqs"

export interface SearchFilterProps {
  paramKey?: string
  placeholder?: string
  className?: string
}

export function SearchFilter({
  paramKey = "q",
  placeholder = "Search...",
  className,
}: SearchFilterProps) {
  const [value, setValue] = useQueryState(
    paramKey,
    parseAsString.withDefault("").withOptions({
      limitUrlUpdates: debounce(FILTER_URL_UPDATE_DELAY_MS),
      clearOnDefault: true,
    }),
  )

  return (
    <InputGroup className={ cn("min-w-40", className) }>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        placeholder={ placeholder }
        value={ value }
        onChange={ (event) => {
          const next = event.target.value
          setValue(next === "" ? null : next, {
            limitUrlUpdates: debounce(FILTER_URL_UPDATE_DELAY_MS),
          })
        } }
      />
    </InputGroup>
  )
}
