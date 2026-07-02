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
import { salesByCategoryData } from "@/lib/chart-data"

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function TopProductsChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Horizontal bar chart of top categories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={ chartConfig } className="aspect-auto h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={ salesByCategoryData }
            layout="vertical"
            margin={ { left: 0 } }
          >
            <CartesianGrid horizontal={ false } />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={ false }
              axisLine={ false }
              tickMargin={ 8 }
              width={ 80 }
            />
            <XAxis type="number" tickLine={ false } axisLine={ false } tickMargin={ 8 } />
            <ChartTooltip content={ <ChartTooltipContent hideLabel /> } />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={ [0, 4, 4, 0] } />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
