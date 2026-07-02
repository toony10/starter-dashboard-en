import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { DashboardIntroFilters } from "@/components/shared/filters/DashboardIntroFilters"
import { AnalyticsKpiCards } from "@/components/shared/charts/AnalyticsKpiCards"
import { RevenueLineChart } from "@/components/shared/charts/RevenueLineChart"
import { VisitorAreaChart } from "@/components/shared/charts/VisitorAreaChart"
import { ProductsTable, type Product } from "@/components/shared/table/ProductsTable"
import { MainH, SectionH } from "@/components/shared/text/Headings"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { navigation, type NavItem } from "@/config/navigation"

const recentProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    status: "active",
  },
  {
    id: "PRD-002",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 349.0,
    status: "active",
  },
  {
    id: "PRD-003",
    name: "Stainless Water Bottle",
    category: "Accessories",
    price: 24.5,
    status: "draft",
  },
  {
    id: "PRD-004",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    status: "active",
  },
  {
    id: "PRD-005",
    name: "Desk Lamp",
    category: "Furniture",
    price: 45.0,
    status: "archived",
  },
]

const moduleMeta: Record<
  string,
  { description: string; highlights: string[] }
> = {
  Forms: {
    description:
      "Rich text editing, image uploads, file uploads, and date-time inputs with validation and previews.",
    highlights: ["Rich Text Editor", "Image Uploader", "File Uploader", "Date Input"],
  },
  Filters: {
    description:
      "URL-synced filters for search, pagination, selects, limits, and one-click reset.",
    highlights: ["Search", "Pagination", "Select", "Limit", "Reset"],
  },
  Charts: {
    description:
      "Recharts-powered line, area, bar, pie, and radial charts with shadcn styling.",
    highlights: ["KPI cards", "Line & area", "Bar & pie", "Radial"],
  },
  Table: {
    description:
      "Sortable data tables built with TanStack Table and shadcn/ui primitives.",
    highlights: ["Column sorting", "Row actions", "Loading states"],
  },
  Settings: {
    description:
      "Customize dashboard appearance, including curated dark theme backgrounds.",
    highlights: ["Dark theme presets", "Shell & sidebar colors"],
  },
}

function getFeatureModules(): NavItem[] {
  return navigation.flatMap((group) =>
    group.items.filter((item) => item.url !== "/"),
  )
}

export default function DashboardPage() {
  const featureModules = getFeatureModules()

  return (
    <div className="flex flex-col gap-10">
      <MainH
        title="Starter Dashboard"
        description="A production-ready admin shell with reusable charts, tables, filters, forms, and settings — explore each module below."
      />

      <section className="flex flex-col gap-4">
        <AnalyticsKpiCards />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionH
            title="Analytics overview"
            description="Live chart components from the analytics module."
          />
          <Button variant="outline" size="sm" asChild>
            <Link href="/charts/analytics">
              Open analytics
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <RevenueLineChart />
          <VisitorAreaChart />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH
          title="Explore modules"
          description="Jump into each feature area of the dashboard."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          { featureModules.map((module) => {
            const meta = moduleMeta[module.title]
            const Icon = module.icon

            return (
              <Link key={ module.url } href={ module.url }>
                <Card className="group h-full transition-all hover:border-primary/30 hover:bg-muted/40 hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{ module.title }</CardTitle>
                    <CardDescription>
                      { meta?.description ?? `Explore ${ module.title.toLowerCase() }.` }
                    </CardDescription>
                    { meta?.highlights ? (
                      <p className="pt-1 text-xs text-muted-foreground">
                        { meta.highlights.join(" · ") }
                      </p>
                    ) : null }
                  </CardHeader>
                </Card>
              </Link>
            )
          }) }
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionH
            title="Recent products"
            description="DataTable with sorting, formatting, and row actions."
          />
          <Button variant="outline" size="sm" asChild>
            <Link href="/table">
              View full table
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <ProductsTable data={ recentProducts } />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionH
            title="Filter toolkit"
            description="Composable filters that sync state to the URL — try them here."
          />
          <Button variant="outline" size="sm" asChild>
            <Link href="/filters">
              Browse all filters
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader className="gap-4">
            <CardTitle className="text-base">Quick filter demo</CardTitle>
            <CardDescription>
              Search and limit controls update the page URL. Reset clears active
              params.
            </CardDescription>
            <DashboardIntroFilters />
          </CardHeader>
        </Card>
      </section>
    </div>
  )
}
