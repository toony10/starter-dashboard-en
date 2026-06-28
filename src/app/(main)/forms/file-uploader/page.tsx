import { FileUploader } from "@/components/shared/forms/FileUploader";
import { MainH } from "@/components/shared/text/Headings";

export default async function FileUploaderPage() {
  return (
    <div className="flex flex-col gap-6">
      <MainH
        title="File Uploader"
        description="Upload documents, spreadsheets, and archives with validation and file type icons."
      />
      <FileUploader />
    </div>
  );
}
