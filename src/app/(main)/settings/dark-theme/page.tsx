import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { DarkBackgroundPicker } from "@/components/settings/DarkBackgroundPicker"
import { MainH } from "@/components/shared/text/Headings"
import { Button } from "@/components/ui/button"

export default function DarkThemeSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <Button variant="ghost" size="sm" className="self-start" asChild>
          <Link href="/settings">
            <ArrowLeft className="size-4" />
            Back to settings
          </Link>
        </Button>
        <MainH
          title="Dark Theme Colors"
          description="Choose dark mode background and card colors for the dashboard shell and sidebar."
        />
      </div>
      <DarkBackgroundPicker />
    </div>
  )
}
