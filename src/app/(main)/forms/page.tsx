import Link from "next/link";
import { MainH } from "@/components/shared/text/Headings";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formPages = [
  {
    title: "Rich Text Editor",
    description:
      "A full-featured WYSIWYG editor with formatting, lists, links, and color options.",
    href: "/forms/rich-text",
  },
  {
    title: "Image Uploader",
    description:
      "Drag and drop or browse to upload images with preview thumbnails and size limits.",
    href: "/forms/image-uploader",
  },
  {
    title: "File Uploader",
    description:
      "Upload documents, spreadsheets, and archives with validation and file type icons.",
    href: "/forms/file-uploader",
  },
];

export default function FormsPage() {
  return (
    <div className="flex flex-col gap-8">
      <MainH
        title="Forms"
        description="Reusable form components for rich text, images, and file uploads."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        { formPages.map((page) => (
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
