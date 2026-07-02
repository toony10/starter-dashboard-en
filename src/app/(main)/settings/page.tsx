import Link from "next/link"
import { Moon, Palette } from "lucide-react"

import { MainH } from "@/components/shared/text/Headings"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const settingsPages = [
  {
    title: "Dark Theme Colors",
    description:
      "Pick a dark mode background for the dashboard shell and sidebar from curated presets.",
    href: "/settings/dark-theme",
    icon: Moon,
  },
]

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Settings"
        description="Customize how the dashboard looks and feels."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        { settingsPages.map((page) => (
          <Link key={ page.href } href={ page.href }>
            <Card className="group h-full overflow-hidden transition-all hover:border-primary/30 hover:bg-muted/40 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <page.icon className="size-5" />
                </div>
                <CardTitle>{ page.title }</CardTitle>
                <CardDescription>{ page.description }</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )) }
        <Card className="h-full border-dashed bg-muted/20">
          <CardHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Palette className="size-5" />
            </div>
            <CardTitle className="text-muted-foreground">More settings</CardTitle>
            <CardDescription>
              Additional appearance options will land here soon.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
