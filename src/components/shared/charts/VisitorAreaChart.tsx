"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
import { visitorTrafficData } from "@/lib/chart-data"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function VisitorAreaChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Visitor Traffic</CardTitle>
        <CardDescription>Stacked area chart by device type</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={ chartConfig } className="aspect-auto h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={ visitorTrafficData }
            margin={ { left: 12, right: 12 } }
          >
            <CartesianGrid vertical={ false } />
            <XAxis
              dataKey="month"
              tickLine={ false }
              axisLine={ false }
              tickMargin={ 8 }
            />
            <ChartTooltip content={ <ChartTooltipContent indicator="line" /> } />
            <ChartLegend content={ <ChartLegendContent /> } />
            <Area
              dataKey="tablet"
              type="natural"
              fill="var(--color-tablet)"
              fillOpacity={ 0.4 }
              stroke="var(--color-tablet)"
              stackId="a"
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={ 0.4 }
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={ 0.4 }
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
