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
import { useAttachmentStore } from "@/stores/attachmentStore";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function BookViewer({ viewMode = true, isReadOnly = false }) {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { id } = useParams();
  const bookStore = useBookStore();
  const attachmentStore = useAttachmentStore();
  const getBookById = useBookStore((state) => state.getById);
  const loadImage = useAttachmentStore((state) => state.loadImage);
  const bookData = bookStore.selectedData;
  const progress = attachmentStore.progress;
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);

  const initFormData = {
    nameTh: null,
    nameEn: null,
    author: null,
    publisher: null,
    pages: null,
    isbn: null,
    attachmentId: null,
    rating: null,
    price: null,
    discount: null,
    description: null,
    summary: null,
    status: true,
    updatedAt: new Date(),
    attachmentFormData: null,
  };

  const { formState:{ errors }, register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: initFormData,
  });

  const formValues = watch();

  useEffect(() => {
    if (viewMode && id) {
      getBookById(id);
    }
  }, [viewMode, id, getBookById]);

  const fetchAttachment = useCallback(async () => {
    if (viewMode && bookData?.id) {
      reset({
        nameTh: bookData.nameTh || null,
        nameEn: bookData.nameEn || null,
        author: bookData.author || null,
        publisher: bookData.publisher || null,
        pages: bookData.pages || null,
        isbn: bookData.isbn || null,
        rating: bookData.rating || null,
        price: bookData.price || null,
        discount: bookData.discount || null,
        description: bookData.description || null,
        summary: bookData.summary || null,
        status: !!bookData.status,
        attachmentId: bookData.attachmentId || null,
        attachmentFormData: null,
      });
      if (bookData.attachmentId && bookData.attachment) {
        const imageUrl = await loadImage(bookData.attachment.path);
        setPreviewUrl(imageUrl);
        setFileName(bookData.attachment.name);
      }
    }
  }, [viewMode, bookData, reset, loadImage]);

  useEffect(() => {
    fetchAttachment();
  }, [bookData, viewMode, reset, loadImage, fetchAttachment]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setFileName(file.name);

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
      const res = await attachmentStore.create(formData);
      if (res?.data?.id) {
        setValue("attachmentId", res.data.id); // 👈 set เข้า form
      }
    } catch (err) {
      console.error("Upload failed", err);
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
                {errors.nameTh?.type === "required" && (
                    <p className="invalid-feedback">Name (TH) is required</p>
                  )}
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
                {errors.nameEn?.type === "required" && (
                    <p className="invalid-feedback">Name (EN) is required</p>
                  )}
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
                {errors.author?.type === "required" && (
                    <p className="invalid-feedback">Author is required</p>
                  )}
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
                {errors.publisher?.type === "required" && (
                    <p className="invalid-feedback">Publisher is required</p>
                  )}
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
                { errors.pages?.type === "required" && (
                    <p className="invalid-feedback">Pages {t("validation.roles")}</p>
                  )}
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
              <Label htmlFor="file" className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                File
              </Label>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-3">
                <input
                  id="file"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e)=>handleFileChange(e)}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />

                {/* Button to trigger file input */}
                <div>
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isReadOnly}
                  >
                    <FontAwesomeIcon icon={faCloudArrowUp}></FontAwesomeIcon>Choose File
                  </Button>
                  <span className="ps-5">{fileName}</span>
                </div>

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
            onClick={() => navigation(-1)}>
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
