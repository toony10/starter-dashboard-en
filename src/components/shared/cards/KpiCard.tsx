import { TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type KpiCardProps = {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}

export function KpiCard({ title, value, change, trend }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{ title }</CardTitle>
        { trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        ) }
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{ value }</div>
        <p
          className={ cn(
            "text-xs",
            trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
          ) }
        >
          { change } from last month
        </p>
      </CardContent>
    </Card>
  )
}
