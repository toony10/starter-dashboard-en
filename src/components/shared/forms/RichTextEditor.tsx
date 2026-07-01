"use client"

import * as React from "react"
import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  Underline as LucideUnderline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Minus,
  Link2,
  Undo2,
  Redo2,
  Highlighter,
  ChevronDown,
  Palette,
  Type,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ── Props ────────────────────────────────────────────────────────────────────

export interface RichTextEditorProps {
  /** Used as `name` on a hidden `<input>` for plain-form submission */
  name?: string
  /** Called with the HTML string every time content changes */
  onChange?: (value: string) => void
  /** Initial HTML content */
  value?: string
  /** Placeholder text shown when the editor is empty */
  placeholder?: string
  /** Extra classes applied to the outer wrapper */
  className?: string
  /** Disables all editing */
  disabled?: boolean
  /** Minimum height of the editable area (CSS value or number in px) */
  minHeight?: number | string
}

// ── Constants ────────────────────────────────────────────────────────────────

const TEXT_COLORS = [
  { label: "Default", value: "unset" },
  { label: "Red", value: "#ef4444" },
  { label: "Orange", value: "#f97316" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Green", value: "#22c55e" },
  { label: "Teal", value: "#14b8a6" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Pink", value: "#ec4899" },
  { label: "Slate", value: "#64748b" },
] as const

const HIGHLIGHT_COLORS = [
  { label: "None", value: "" },
  { label: "Yellow", value: "#fef08a" },
  { label: "Green", value: "#bbf7d0" },
  { label: "Blue", value: "#bfdbfe" },
  { label: "Pink", value: "#fbcfe8" },
  { label: "Orange", value: "#fed7aa" },
  { label: "Purple", value: "#e9d5ff" },
] as const

// ── Helpers ──────────────────────────────────────────────────────────────────

interface ToolbarButtonProps {
  onClick?: () => void
  isActive?: boolean | null
  disabled?: boolean
  tooltip: string
  children: React.ReactNode
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  tooltip,
  children,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={ isActive ? "secondary" : "ghost" }
          size="icon-sm"
          onClick={ onClick }
          disabled={ disabled }
          className={ cn(isActive && "bg-primary/20 focus:bg-primary/40") }
          aria-pressed={ isActive ?? false }
        >
          { children }
        </Button>
      </TooltipTrigger>
      <TooltipContent>{ tooltip }</TooltipContent>
    </Tooltip>
  )
}

// ── Component ────────────────────────────────────────────────────────────────

export function RichTextEditor({
  name,
  onChange,
  value = "",
  placeholder = "Write something…",
  className,
  disabled = false,
  minHeight = 200,
}: RichTextEditorProps) {
  const minH = typeof minHeight === "number" ? `${ minHeight }px` : minHeight

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML())
    },
  })

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      isBold: e?.isActive("bold") ?? false,
      isItalic: e?.isActive("italic") ?? false,
      isUnderline: e?.isActive("underline") ?? false,
      isStrike: e?.isActive("strike") ?? false,
      isH1: e?.isActive("heading", { level: 1 }) ?? false,
      isH2: e?.isActive("heading", { level: 2 }) ?? false,
      isH3: e?.isActive("heading", { level: 3 }) ?? false,
      isAlignLeft: e?.isActive({ textAlign: "left" }) ?? false,
      isAlignCenter: e?.isActive({ textAlign: "center" }) ?? false,
      isAlignRight: e?.isActive({ textAlign: "right" }) ?? false,
      isAlignJustify: e?.isActive({ textAlign: "justify" }) ?? false,
      isBulletList: e?.isActive("bulletList") ?? false,
      isOrderedList: e?.isActive("orderedList") ?? false,
      isBlockquote: e?.isActive("blockquote") ?? false,
      isCode: e?.isActive("code") ?? false,
      isCodeBlock: e?.isActive("codeBlock") ?? false,
      isLink: e?.isActive("link") ?? false,
      isHighlight: e?.isActive("highlight") ?? false,
      canUndo: e?.can().undo() ?? false,
      canRedo: e?.can().redo() ?? false,
    }),
  })

  const currentBlockLabel = state?.isH1
    ? "Heading 1"
    : state?.isH2
      ? "Heading 2"
      : state?.isH3
        ? "Heading 3"
        : "Paragraph"

  const handleLink = React.useCallback(() => {
    if (!editor) return
    if (state?.isLink) {
      editor.chain().focus().unsetLink().run()
      return
    }
    const url = window.prompt("Enter URL:")
    if (url) {
      editor.chain().focus().setLink({ href: url, target: "_blank" }).run()
    }
  }, [editor, state?.isLink])

  if (!editor) return null

  return (
    <TooltipProvider>
      {/* Scoped editor styles */ }
      <style>{ `
        .rte-editor .tiptap {
          min-height: ${ minH };
          padding: 12px 14px;
          outline: none;
          font-size: 0.875rem;
          line-height: 1.75;
          color: inherit;
        }
        .rte-editor .tiptap > * + * { margin-top: 0.5rem; }
        .rte-editor .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--muted-foreground);
          pointer-events: none;
          height: 0;
        }
        .rte-editor .tiptap h1 { font-size: 1.5em; font-weight: 700; line-height: 1.3; }
        .rte-editor .tiptap h2 { font-size: 1.25em; font-weight: 600; line-height: 1.3; }
        .rte-editor .tiptap h3 { font-size: 1.125em; font-weight: 600; line-height: 1.3; }
        .rte-editor .tiptap ul { list-style-type: disc; padding-left: 1.5em; }
        .rte-editor .tiptap ol { list-style-type: decimal; padding-left: 1.5em; }
        .rte-editor .tiptap li + li { margin-top: 0.125em; }
        .rte-editor .tiptap blockquote {
          border-left: 3px solid var(--border);
          padding-left: 1em;
          margin-left: 0;
          color: var(--muted-foreground);
          font-style: italic;
        }
        .rte-editor .tiptap code {
          font-family: var(--font-mono, monospace);
          font-size: 0.875em;
          background: var(--muted);
          padding: 0.1em 0.35em;
          border-radius: 4px;
        }
        .rte-editor .tiptap pre {
          background: var(--muted);
          border-radius: 6px;
          padding: 0.75em 1em;
          overflow-x: auto;
        }
        .rte-editor .tiptap pre code {
          background: transparent;
          padding: 0;
          font-size: 0.8em;
        }
        .rte-editor .tiptap hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0.5em 0;
        }
        .rte-editor .tiptap a {
          color: var(--primary);
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
        }
        .rte-editor .tiptap mark {
          border-radius: 3px;
          padding: 0.05em 0.2em;
        }
        .rte-editor .tiptap p[style*="text-align: right"] { text-align: right; }
        .rte-editor .tiptap p[style*="text-align: center"] { text-align: center; }
        .rte-editor .tiptap p[style*="text-align: justify"] { text-align: justify; }
      `}</style>

      <div
        className={ cn(
          "overflow-hidden rounded-lg border border-input bg-background transition-all",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "cursor-not-allowed opacity-60",
          className,
        ) }
      >
        {/* ── Toolbar ─────────────────────────────────────────────────────── */ }
        <div
          className="flex flex-wrap items-center gap-px border-b border-border bg-muted/40 p-1.5"
          onMouseDown={ (e) => e.preventDefault() }
        >
          {/* Undo / Redo */ }
          <ToolbarButton
            tooltip="Undo (⌘Z)"
            disabled={ disabled || !state?.canUndo }
            onClick={ () => editor.chain().focus().undo().run() }
          >
            <Undo2 />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Redo (⌘⇧Z)"
            disabled={ disabled || !state?.canRedo }
            onClick={ () => editor.chain().focus().redo().run() }
          >
            <Redo2 />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* Block type */ }
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={ disabled }
                    className="h-7 w-28 justify-between gap-1 px-2 text-xs font-normal"
                  >
                    <Type className="size-3.5 shrink-0" />
                    <span className="flex-1 truncate text-left">
                      { currentBlockLabel }
                    </span>
                    <ChevronDown className="size-3 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Text style</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onSelect={ () => editor.chain().focus().setParagraph().run() }
                className="gap-2 text-sm"
              >
                <Type className="size-4" />
                Paragraph
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={ () =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className="gap-2"
              >
                <span className="w-4 text-center text-base font-bold leading-none">
                  H1
                </span>
                Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={ () =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className="gap-2"
              >
                <span className="w-4 text-center font-bold leading-none">
                  H2
                </span>
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={ () =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className="gap-2"
              >
                <span className="w-4 text-center text-sm font-semibold leading-none">
                  H3
                </span>
                Heading 3
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* Inline formatting */ }
          <ToolbarButton
            tooltip="Bold (⌘B)"
            isActive={ state?.isBold }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleBold().run() }
          >
            <Bold />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Italic (⌘I)"
            isActive={ state?.isItalic }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleItalic().run() }
          >
            <Italic />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Underline (⌘U)"
            isActive={ state?.isUnderline }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleUnderline().run() }
          >
            <LucideUnderline />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Strikethrough"
            isActive={ state?.isStrike }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleStrike().run() }
          >
            <Strikethrough />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* Text color */ }
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={ disabled }
                  >
                    <Palette />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Text color</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start" className="w-auto min-w-0 p-2.5">
              <p className="mb-2 text-[11px] font-medium text-muted-foreground">
                Text color
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                { TEXT_COLORS.map(({ label, value }) => (
                  <button
                    key={ value }
                    type="button"
                    title={ label }
                    className={ cn(
                      "flex size-6 items-center justify-center rounded border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring",
                      value === "unset"
                        ? "border-border bg-background text-[10px] font-semibold text-foreground/70 hover:border-foreground/30"
                        : "border-transparent hover:border-foreground/20",
                    ) }
                    style={
                      value !== "unset" ? { backgroundColor: value } : undefined
                    }
                    onClick={ () => {
                      if (value === "unset") {
                        editor.chain().focus().unsetColor().run()
                      } else {
                        editor.chain().focus().setColor(value).run()
                      }
                    } }
                  >
                    { value === "unset" ? "A" : null }
                  </button>
                )) }
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Highlight */ }
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant={ state?.isHighlight ? "secondary" : "ghost" }
                    size="icon-sm"
                    disabled={ disabled }
                  >
                    <Highlighter />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Highlight</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start" className="w-auto min-w-0 p-2.5">
              <p className="mb-2 text-[11px] font-medium text-muted-foreground">
                Highlight color
              </p>
              <div className="flex gap-1.5">
                { HIGHLIGHT_COLORS.map(({ label, value }) => (
                  <button
                    key={ label }
                    type="button"
                    title={ label }
                    className={ cn(
                      "flex size-6 items-center justify-center rounded border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring",
                      !value
                        ? "border-border bg-background text-[10px] font-semibold text-foreground/50 hover:border-foreground/30"
                        : "border-transparent hover:border-foreground/20",
                    ) }
                    style={ value ? { backgroundColor: value } : undefined }
                    onClick={ () => {
                      if (!value) {
                        editor.chain().focus().unsetHighlight().run()
                      } else {
                        editor.chain().focus().setHighlight({ color: value }).run()
                      }
                    } }
                  >
                    { !value ? "✕" : null }
                  </button>
                )) }
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* Text alignment */ }
          <ToolbarButton
            tooltip="Align left"
            isActive={ state?.isAlignLeft }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().setTextAlign("left").run() }
          >
            <AlignLeft />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Align center"
            isActive={ state?.isAlignCenter }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().setTextAlign("center").run() }
          >
            <AlignCenter />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Align right"
            isActive={ state?.isAlignRight }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().setTextAlign("right").run() }
          >
            <AlignRight />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Justify"
            isActive={ state?.isAlignJustify }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().setTextAlign("justify").run() }
          >
            <AlignJustify />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* Lists */ }
          <ToolbarButton
            tooltip="Bullet list"
            isActive={ state?.isBulletList }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleBulletList().run() }
          >
            <List />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Numbered list"
            isActive={ state?.isOrderedList }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleOrderedList().run() }
          >
            <ListOrdered />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* Block elements */ }
          <ToolbarButton
            tooltip="Blockquote"
            isActive={ state?.isBlockquote }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleBlockquote().run() }
          >
            <Quote />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Inline code"
            isActive={ state?.isCode }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleCode().run() }
          >
            <Code />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Code block"
            isActive={ state?.isCodeBlock }
            disabled={ disabled }
            onClick={ () => editor.chain().focus().toggleCodeBlock().run() }
          >
            <FileCode />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Divider"
            disabled={ disabled }
            onClick={ () => editor.chain().focus().setHorizontalRule().run() }
          >
            <Minus />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-5" />

          {/* Link */ }
          <ToolbarButton
            tooltip={ state?.isLink ? "Remove link" : "Add link" }
            isActive={ state?.isLink }
            disabled={ disabled }
            onClick={ handleLink }
          >
            <Link2 />
          </ToolbarButton>
        </div>

        {/* ── Editable area ────────────────────────────────────────────────── */ }
        <EditorContent editor={ editor } className="rte-editor" />

        {/* Hidden input for native form submission */ }
        { name && (
          <input type="hidden" name={ name } value={ editor.getHTML() } />
        ) }
      </div>
    </TooltipProvider>
  )
}
