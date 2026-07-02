"use client"

import { LimitFilter } from "@/components/shared/filters/LimitFilter"
import { ResetFilters } from "@/components/shared/filters/ResetFilters"
import { SearchFilter } from "@/components/shared/filters/SearchFilter"

export function DashboardIntroFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <SearchFilter placeholder="Search products..." className="sm:min-w-56" />
      <LimitFilter className="sm:w-40" />
      <ResetFilters keys={ ["q", "limit"] } />
    </div>
  )
}
