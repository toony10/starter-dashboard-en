"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  UploadCloudIcon,
  XIcon,
  CheckCircle2Icon,
  ZoomInIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─────────────────────────── Types ─────────────────────────── */

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "uploading" | "done";
}

export interface ImageUploaderProps {
  /** Field name for the hidden file <input> */
  name?: string;
  /** Called whenever the list of accepted images changes */
  onChange?: (files: File[]) => void;
  /** Maximum number of images allowed (default: 5) */
  maxImages?: number;
  /** Maximum size per file in bytes (default: 5 MB) */
  maxSize?: number;
  /** Accept string forwarded to the file <input> (default: "image/*") */
  accept?: string;
  /** Pre-populate the uploader with these files */
  defaultFiles?: File[];
  /** Extra classes applied to the root wrapper */
  className?: string;
  /** Disable the uploader */
  disabled?: boolean;
  /** Label shown inside the drop-zone */
  label?: React.ReactNode;
  /** Hint text shown below the label */
  hint?: string;
  /** Show file names below each thumbnail */
  showFileNames?: boolean;
  /** CSS aspect-ratio for each thumbnail (e.g. "1/1", "16/9") */
  aspectRatio?: string;
  /** Number of thumbnail columns (default: 3) */
  columns?: 2 | 3 | 4 | 5;
}

/* ───────────────────────── Helpers ─────────────────────────── */

const COLUMNS_CLASS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-5",
};

function uid() {
  return Math.random().toString(36).slice(2);
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function toImageFiles(files: File[]): ImageFile[] {
  return files.map((file) => ({
    id: uid(),
    file,
    preview: URL.createObjectURL(file),
    status: "idle" as const,
  }));
}

/* ───────────────────────── Component ───────────────────────── */

export function ImageUploader({
  name,
  onChange,
  maxImages = 5,
  maxSize = 5 * 1024 * 1024,
  accept = "image/*",
  defaultFiles,
  className,
  disabled = false,
  label,
  hint,
  showFileNames = false,
  aspectRatio = "1/1",
  columns = 3,
}: ImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [lightbox, setLightbox] = React.useState<string | null>(null);
  const [images, setImages] = React.useState<ImageFile[]>(() =>
    toImageFiles(defaultFiles ?? [])
  );
  const dragCounter = React.useRef(0);

  /* revoke preview URLs on unmount */
  React.useEffect(() => {
    const snapshot = images;
    return () => snapshot.forEach((img) => URL.revokeObjectURL(img.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── process incoming files ── */
  const processFiles = React.useCallback(
    (incoming: FileList | File[]) => {
      setImages((prev) => {
        const slots = maxImages - prev.length;
        if (slots <= 0) return prev;

        const accepted: ImageFile[] = [];

        Array.from(incoming)
          .slice(0, slots)
          .forEach((file) => {
            if (!file.type.startsWith("image/")) return; // silently reject non-images
            if (file.size > maxSize) return;             // silently reject oversized files

            accepted.push({
              id: uid(),
              file,
              preview: URL.createObjectURL(file),
              status: "idle",
            });
          });

        if (accepted.length === 0) return prev;

        const next = [...prev, ...accepted];
        onChange?.(next.map((i) => i.file));
        return next;
      });
    },
    [maxImages, maxSize, onChange]
  );

  /* ── remove ── */
  const remove = React.useCallback(
    (id: string) => {
      setImages((prev) => {
        const target = prev.find((i) => i.id === id);
        if (target) URL.revokeObjectURL(target.preview);
        const next = prev.filter((i) => i.id !== id);
        onChange?.(next.map((i) => i.file));
        return next;
      });
    },
    [onChange]
  );

  /* ── drag events ── */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    if (e.dataTransfer.items.length) setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  const isFull = images.length >= maxImages;
  const canAdd = !disabled && !isFull;

  /* ────────────────────────── Render ────────────────────────── */
  return (
    <>
      <div className={cn("space-y-3", className)}>
        {/* ── Drop Zone ── */}
        {canAdd && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload images"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            className={cn(
              "group relative flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 select-none",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.01] shadow-lg shadow-primary/10"
                : "border-border hover:border-primary/60 hover:bg-muted/30",
              disabled && "pointer-events-none opacity-50"
            )}
          >
            {/* radial glow on drag */}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 transition-opacity duration-500",
                "bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--color-primary)_8%,transparent)_0%,transparent_70%)]",
                isDragging ? "opacity-100" : "opacity-0"
              )}
            />

            {/* upload icon */}
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-full border border-border bg-muted transition-all duration-300",
                isDragging
                  ? "scale-110 border-primary/40 bg-primary/10 text-primary"
                  : "group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary"
              )}
            >
              <UploadCloudIcon
                className={cn(
                  "size-6 transition-transform duration-300",
                  isDragging && "-translate-y-0.5"
                )}
              />
            </div>

            {/* label */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                {isDragging ? (
                  "Drop images here"
                ) : label ? (
                  label
                ) : (
                  <>
                    <span className="text-primary underline-offset-2 hover:underline">
                      Click to upload
                    </span>
                    {" "}or drag &amp; drop
                  </>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {hint ??
                  `Up to ${maxImages} image${maxImages !== 1 ? "s" : ""} · max ${formatBytes(maxSize)} each`}
              </p>
            </div>

            {/* counter pill */}
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              <ImageIcon className="size-3" />
              {images.length} / {maxImages}
            </div>

            <input
              ref={inputRef}
              name={name}
              type="file"
              accept={accept}
              multiple={maxImages > 1}
              className="sr-only"
              onChange={(e) => {
                if (e.target.files) processFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>
        )}

        {/* ── Thumbnails grid ── */}
        {images.length > 0 && (
          <div className={cn("grid gap-3", COLUMNS_CLASS[columns])}>
            {images.map((img) => (
              <Thumbnail
                key={img.id}
                img={img}
                aspectRatio={aspectRatio}
                showFileName={showFileNames}
                onRemove={() => remove(img.id)}
                onZoom={() => setLightbox(img.preview)}
                disabled={disabled}
              />
            ))}

            {/* "add more" card — shown inside grid when not full */}
            {!isFull && images.length > 0 && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={disabled}
                style={{ aspectRatio }}
                className={cn(
                  "group flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/20 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary",
                  disabled && "pointer-events-none opacity-40"
                )}
              >
                <div className="flex size-9 items-center justify-center rounded-full border border-dashed border-current transition-transform duration-200 group-hover:scale-110">
                  <span className="text-lg leading-none select-none">+</span>
                </div>
                <span className="text-[11px] font-medium">Add more</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

/* ─────────────────── Thumbnail sub-component ─────────────────── */

interface ThumbnailProps {
  img: ImageFile;
  aspectRatio: string;
  showFileName: boolean;
  onRemove: () => void;
  onZoom: () => void;
  disabled: boolean;
}

function Thumbnail({
  img,
  aspectRatio,
  showFileName,
  onRemove,
  onZoom,
  disabled,
}: ThumbnailProps) {
  return (
    <div className="group/thumb flex flex-col gap-1.5">
      <div
        className="relative overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition-shadow duration-200 group-hover/thumb:shadow-md"
        style={{ aspectRatio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.preview}
          alt={img.file.name}
          className="size-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
        />

        {/* hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-200 group-hover/thumb:bg-black/40 group-hover/thumb:opacity-100">
          <ActionButton
            onClick={(e) => { e.stopPropagation(); onZoom(); }}
            aria-label="Preview image"
            className="bg-white/90 text-foreground hover:bg-white"
          >
            <ZoomInIcon className="size-3.5" />
          </ActionButton>

          {!disabled && (
            <ActionButton
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              aria-label="Remove image"
              className="bg-destructive/90 text-white hover:bg-destructive"
            >
              <XIcon className="size-3.5" />
            </ActionButton>
          )}
        </div>

        {/* done badge */}
        {img.status === "done" && (
          <div className="absolute top-1.5 left-1.5 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
            <CheckCircle2Icon className="size-3" />
          </div>
        )}

        {/* uploading spinner */}
        {img.status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="size-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </div>
        )}
      </div>

      {showFileName && (
        <p className="truncate text-[11px] text-muted-foreground" title={img.file.name}>
          {img.file.name}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────── Action icon button ─────────────────────── */

function ActionButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex size-7 cursor-pointer items-center justify-center rounded-full shadow transition-all duration-150 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ───────────────────────────── Lightbox ───────────────────────────── */

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10"
        onClick={onClose}
        aria-label="Close preview"
      >
        <XIcon className="size-5" />
      </Button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Preview"
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
