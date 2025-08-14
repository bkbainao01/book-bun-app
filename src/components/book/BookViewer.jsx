import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useBookStore } from "@/stores/bookStore"
import { useState, useEffect } from "react"

export default function BookCreator({
  viewMode = true,
  isReadOnly = false,
}) {
  const bookStore = useBookStore();
  const getById = useBookStore((state)=> state.getById);

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
      updatedAt: new Date()
    }

  const bookForm = useForm({ defaultValues: initFormData })
  // in bookForm have { register, handleSubmit,setValue,watch }

  const formValues = bookForm.watch()

  const onSubmit = (data) => {
    console.log("Submitted Data:", data)
  }

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
          <form onSubmit={()=> bookForm.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-5 ">
              {/* Name TH */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="name">Name TH</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="nameTh"
                  type="text"
                  placeholder="แอสเซนเดน เอเดน"
                  {...bookForm.register("nameTh", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>
              {/* Name EN */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="name">Name EN</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="nameEn"
                  type="text"
                  placeholder="Ascendent Eden"
                  {...bookForm.register("nameEn", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>
              {/* Author */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="author">Author</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="author"
                  type="text"
                  placeholder="John Doe"
                  {...bookForm.register("author", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>
              {/* Publisher */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="publisher">Publisher</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="publisher"
                  type="text"
                  placeholder="John Doe"
                  {...bookForm.register("publisher", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>
              {/* Pages */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="pages">Pages</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="pages"
                  type="number"
                  placeholder="120"
                  {...bookForm.register("pages", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>
              {/* Price */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="price">Price</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="price"
                  type="number"
                  placeholder="120"
                  {...bookForm.register("price", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>
              {/* Discount */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="discount">Discount</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="discount"
                  type="number"
                  placeholder="120"
                  {...bookForm.register("discount", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>
              {/* description */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="description">Description</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Textarea
                  id="description"
                  placeholder="Type your description here"
                  {...bookForm.register("description", { required: true })}
                  readOnly={isReadOnly}
                   />
              </div>
              {/* Status */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="status">Status</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Switch
                  id="status"
                  className={'size-xl'}
                  checked={ formValues.status }
                  onCheckedChange={(val) => bookForm.setValue("status", val)}
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="md:justify-end px-0">
                    <Button variant="outline" className="button-cancel me-2">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="button-save"
                      onClick={()=> onSubmit }>
                        Save
                      </Button>
                  </CardFooter>
      </Card>
    </div>
  )
}
