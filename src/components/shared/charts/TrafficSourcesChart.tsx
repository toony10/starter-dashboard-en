"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { trafficSourcesData } from "@/lib/chart-data"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  organic: {
    label: "Organic Search",
    color: "var(--chart-1)",
  },
  direct: {
    label: "Direct",
    color: "var(--chart-2)",
  },
  social: {
    label: "Social Media",
    color: "var(--chart-3)",
  },
  referral: {
    label: "Referral",
    color: "var(--chart-4)",
  },
  email: {
    label: "Email",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function TrafficSourcesChart() {
  const totalVisitors = React.useMemo(
    () => trafficSourcesData.reduce((acc, curr) => acc + curr.visitors, 0),
    []
  )

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>Donut chart of visitor acquisition channels</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={ chartConfig }
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={ false }
              content={ <ChartTooltipContent hideLabel /> }
            />
            <Pie
              data={ trafficSourcesData }
              dataKey="visitors"
              nameKey="source"
              innerRadius={ 60 }
              strokeWidth={ 4 }
            >
              <Label
                content={ ({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={ viewBox.cx }
                        y={ viewBox.cy }
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={ viewBox.cx }
                          y={ viewBox.cy }
                          className="fill-foreground text-2xl font-bold"
                        >
                          { totalVisitors.toLocaleString() }
                        </tspan>
                        <tspan
                          x={ viewBox.cx }
                          y={ (viewBox.cy || 0) + 20 }
                          className="fill-muted-foreground text-xs"
                        >
                          Total Visitors
                        </tspan>
                      </text>
                    )
                  }
                } }
              />
            </Pie>
            <ChartLegend
              content={ <ChartLegendContent nameKey="source" /> }
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/3 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Organic search leads at 36% <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
