import Link from "next/link";
import { MainH } from "@/components/shared/text/Headings";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const filterPages = [
    {
        title: "Pagination",
        description:
            "Pagination for the application.",
        href: "/filters/pagination",
    },
    {
        title: "Select Filter",
        description:
            "Dropdown filter that syncs a selected value to URL search params.",
        href: "/filters/select",
    },
    {
        title: "Search Filter",
        description:
            "Text search that syncs the query to URL search params.",
        href: "/filters/search",
    },
    {
        title: "Limit Filter",
        description:
            "Select filter that syncs the page size limit to URL search params.",
        href: "/filters/limit",
    },
    {
        title: "Reset Filters",
        description:
            "Button that clears selected search params from the URL.",
        href: "/filters/reset",
    },
];

export default function FiltersPage() {
    return (
        <div className="flex flex-col gap-8">
            <MainH
                title="Filters"
                description="Filters for the application."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                { filterPages.map((page) => (
                    <Link key={ page.href } href={ page.href }>
                        <Card className="h-full transition-colors hover:bg-muted/50">
                            <CardHeader>
                                <CardTitle>{ page.title }</CardTitle>
                                <CardDescription>{ page.description }</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )) }
            </div>
        </div>
    );
}
