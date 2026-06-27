import { ImageUploader } from "@/components/shared/forms/ImageUploader";
import { MainH } from "@/components/shared/text/Headings";

export default function ImageUploaderPage() {
  return (
    <div className="flex flex-col gap-6">
      <MainH
        title="Image Uploader"
        description="Drag and drop or browse to upload images with preview thumbnails and size limits."
      />
      <ImageUploader />
    </div>
  );
}
