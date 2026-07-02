"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { weeklyActivityData } from "@/lib/chart-data"

const chartConfig = {
  orders: {
    label: "Orders",
    color: "var(--chart-1)",
  },
  returns: {
    label: "Returns",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function SalesBarChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Orders and returns per day</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={ chartConfig } className="aspect-auto h-[300px] w-full">
          <BarChart accessibilityLayer data={ weeklyActivityData }>
            <CartesianGrid vertical={ false } />
            <XAxis
              dataKey="day"
              tickLine={ false }
              axisLine={ false }
              tickMargin={ 10 }
            />
            <YAxis tickLine={ false } axisLine={ false } tickMargin={ 8 } />
            <ChartTooltip content={ <ChartTooltipContent /> } />
            <Bar dataKey="orders" fill="var(--color-orders)" radius={ [4, 4, 0, 0] } />
            <Bar dataKey="returns" fill="var(--color-returns)" radius={ [4, 4, 0, 0] } />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
