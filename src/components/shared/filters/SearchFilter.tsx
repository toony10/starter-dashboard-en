"use client"

import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { debounce, parseAsString, useQueryState } from "nuqs"

const DEBOUNCE_MS = 600

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
      limitUrlUpdates: debounce(DEBOUNCE_MS),
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
            limitUrlUpdates: debounce(DEBOUNCE_MS),
          })
        } }
      />
    </InputGroup>
  )
}
