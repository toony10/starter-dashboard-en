"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/shared/forms/RichTextEditor";
import { MainH } from "@/components/shared/text/Headings";

export default function RichTextEditorPage() {
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <MainH
        title="Rich Text Editor"
        description="A full-featured WYSIWYG editor with formatting, lists, links, and color options."
      />
      <RichTextEditor
        value={ content }
        onChange={ setContent }
        placeholder="Start writing..."
      />
    </div>
  );
}
