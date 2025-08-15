import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

/**
 * Helper: upload with progress using XMLHttpRequest (since fetch has no progress)
 */
async function uploadWithProgress({ url, formData, onProgress }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (evt) => {
      if (!evt.lengthComputable) return;
      const percent = Math.round((evt.loaded / evt.total) * 100);
      onProgress?.(percent);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

/**
 * Single file/image upload with shadcn + RHF
 */
export function SingleFileUpload() {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      file: undefined, // single file
    },
  });

  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const selectedFileList = watch("file");
  const selectedFile = selectedFileList?.[0];

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const isImage = selectedFile.type.startsWith("image/");
    if (isImage) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  async function onSubmit(values) {
    if (!selectedFile) return;
    const fd = new FormData();
    fd.append("file", selectedFile);
    fd.append("title", values.title ?? "");
    fd.append("description", values.description ?? "");

    setProgress(0);
    try {
      // Replace "/api/upload" with your endpoint
      await uploadWithProgress({
        url: "/api/upload",
        formData: fd,
        onProgress: setProgress,
      });
      reset();
      setPreviewUrl(null);
      alert("Uploaded successfully");
    } catch (e) {
      console.error(e);
      alert(e.message || "Upload failed");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Single Attachment / Image Upload</CardTitle>
        <CardDescription>shadcn inputs + RHF + progress + image preview</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            <Label className="col-span-12 md:col-span-3">Title</Label>
            <div className="col-span-12 md:col-span-9">
              <Input placeholder="My cover" {...register("title")} />
            </div>

            <Label className="col-span-12 md:col-span-3">Description</Label>
            <div className="col-span-12 md:col-span-9">
              <Textarea placeholder="Optional note" {...register("description")} />
            </div>

            <Label htmlFor="file" className="col-span-12 md:col-span-3">File</Label>
            <div className="col-span-12 md:col-span-9 space-y-3">
              <Input
                id="file"
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                {...register("file")}
              />
              {previewUrl && (
                <div className="rounded-lg border p-3">
                  <div className="text-sm mb-2">Preview</div>
                  <img src={previewUrl} alt="preview" className="max-h-56 object-contain" />
                </div>
              )}

              {!!progress && progress < 100 && (
                <div className="space-y-2">
                  <Progress value={progress} />
                  <div className="text-xs text-muted-foreground">{progress}%</div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => reset()}>Clear</Button>
          <Button type="submit">Upload</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

/**
 * Drag & Drop (react-dropzone) + multiple files + previews
 */
export function DropzoneUpload() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const onDrop = (accepted) => {
    setFiles((prev) => [...prev, ...accepted]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB per file
  });

  const previews = useMemo(
    () =>
      files.map((f) =>
        f.type.startsWith("image/")
          ? { name: f.name, url: URL.createObjectURL(f), type: "image" }
          : { name: f.name, url: null, type: f.type }
      ),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((p) => p.url && URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  async function handleUpload() {
    if (!files.length) return alert("No files selected");
    const fd = new FormData();
    for (const file of files) fd.append("files", file);
    setProgress(0);
    try {
      await uploadWithProgress({ url: "/api/upload/multi", formData: fd, onProgress: setProgress });
      setFiles([]);
      alert("Uploaded successfully");
    } catch (e) {
      console.error(e);
      alert(e.message || "Upload failed");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Drag & Drop Upload</CardTitle>
        <CardDescription>react-dropzone + shadcn UI + progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer",
            isDragActive ? "bg-accent/40" : "bg-background"
          )}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-muted-foreground">
            {isDragActive ? "Drop files here..." : "Drag & drop files here, or click to select"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Images / PDF, up to 10MB each</p>
        </div>

        {files.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {previews.map((p, idx) => (
              <div key={idx} className="border rounded-lg p-3 space-y-2">
                <div className="text-sm font-medium truncate" title={p.name}>{p.name}</div>
                {p.type === "image" ? (
                  <img src={p.url!} alt={p.name} className="h-40 w-full object-contain" />
                ) : (
                  <div className="text-xs text-muted-foreground">{p.type}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {!!progress && progress < 100 && (
          <div className="space-y-2">
            <Progress value={progress} />
            <div className="text-xs text-muted-foreground">{progress}%</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" onClick={() => setFiles([])}>Clear</Button>
        <Button onClick={handleUpload} disabled={!files.length}>Upload</Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Showcase page: put both variants together
 */
export default function UploadDemo() {
  return (
    <div className="container mx-auto max-w-5xl space-y-8 p-4">
      <SingleFileUpload />
      <DropzoneUpload />
    </div>
  );
}
