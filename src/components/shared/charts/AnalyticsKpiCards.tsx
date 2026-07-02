import { KpiCard } from "@/components/shared/cards/KpiCard"
import { kpiStats } from "@/lib/chart-data"

export function AnalyticsKpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      { kpiStats.map((stat) => (
        <KpiCard
          key={ stat.title }
          title={ stat.title }
          value={ stat.value }
          change={ stat.change }
          trend={ stat.trend }
        />
      )) }
    </div>
  )
}
