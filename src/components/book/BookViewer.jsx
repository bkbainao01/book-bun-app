import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useBookStore } from "@/stores/bookStore";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// Upload function with progress tracking
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

export default function BookViewer({ viewMode = true, isReadOnly = false }) {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { id } = useParams();
  const bookStore = useBookStore();
  const getById = useBookStore((state) => state.getById);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const initFormData = {
    nameTh: "",
    nameEn: "",
    author: "",
    publisher: "",
    pages: null,
    isbn: "",
    attachmentId: null,
    rating: null,
    price: null,
    discount: null,
    description: "",
    summary: "",
    status: true,
    updatedAt: new Date(),
  };

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: initFormData,
  });

  const formValues = watch();

  useEffect(() => {
    if (viewMode && id) {
      getById(id);
    }
  }, [viewMode, id, getById]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview if image
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }

    // Upload to server
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadWithProgress({
        url: "/api/upload", // Change this to your backend endpoint
        formData,
        onProgress: setProgress,
      });

      if (res?.attachmentId) {
        setValue("attachmentId", res.attachmentId);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setProgress(0);
    }
  };

  const onSubmit = async (data) => {
    if (viewMode) {
      bookStore.update(id, data);
    } else {
      bookStore.create(data);
    }
  };

  return (
    <div className="book-creator">
      <Card className="card">
        <CardHeader>
          <CardTitle className="header">
            {viewMode ? "Book" : "New Book"}
          </CardTitle>
          <CardDescription className="text-muted">
            {viewMode
              ? "Book information"
              : "Enter form below to create your book"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} id="book-form">
            <div className="grid grid-cols-12 gap-5">
              {/* Name TH */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="nameTh">{t("form.nameTh")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="nameTh"
                  type="text"
                  placeholder="แอสเซนเดน เอเดน"
                  {...register("nameTh", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Name EN */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="nameEn">{t("form.nameEn")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="nameEn"
                  type="text"
                  placeholder="Ascendent Eden"
                  {...register("nameEn", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Author */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="author">{t("form.author")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="author"
                  type="text"
                  placeholder="John Doe"
                  {...register("author", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Publisher */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="publisher">{t("form.publisher")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="publisher"
                  type="text"
                  placeholder="John Doe"
                  {...register("publisher", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Pages */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="pages">{t("form.pages")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="pages"
                  type="number"
                  placeholder="120"
                  {...register("pages", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Price */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="price">{t("form.price")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="price"
                  type="number"
                  placeholder="120"
                  {...register("price", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Discount */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="discount">{t("form.discount")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="discount"
                  type="number"
                  placeholder="120"
                  {...register("discount", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>
              {/* File Upload */}
              <Label htmlFor="file" className="col-span-12 md:col-span-3">
                File
              </Label>
              <div className="col-span-12 md:col-span-9 space-y-3">
                <Input
                  id="file"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={isReadOnly}
                  placeholder="choose"
                />
                {previewUrl && (
                  <div className="rounded-lg border p-3">
                    <div className="text-sm mb-2">Preview</div>
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="max-h-56 object-contain"
                    />
                  </div>
                )}
                {progress > 0 && progress < 100 && (
                  <div className="space-y-2">
                    <Progress value={progress} />
                    <div className="text-xs text-muted-foreground">
                      {progress}%
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="description">{t("form.description")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Textarea
                  id="description"
                  placeholder="Type your description here"
                  {...register("description", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Status */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="status">{t("form.status")}</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Switch
                  id="status"
                  className="size-xl"
                  checked={formValues.status}
                  onCheckedChange={(val) => setValue("status", val)}
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="md:justify-end px-0">
          <Button
            variant="outline"
            className="button-cancel me-2"
            type="button"
            onClick={() => navigation(-1)}
          >
            {t("button.cancel")}
          </Button>
          <Button type="submit" className="button-save" form="book-form">
            {t("button.save")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
