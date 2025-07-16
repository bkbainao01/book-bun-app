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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useBookStore } from "@/stores/bookStore"
import { useState } from "react"

export default function BookCreator({
  viewMode = true,
  isReadOnly = false,
}) {
  const bookStore = useBookStore();
  
  const initFormData = {
      name: '',
      author: '',
      price: '',
      status: true,
    }

  const bookForm = useForm({defaultValues: initFormData})
  // in bookForm have { register, handleSubmit,setValue,watch}

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
          <form onSubmit={bookForm.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ascendent Eden"
                  {...bookForm.register("name", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Author */}
              <div className="grid gap-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  type="text"
                  placeholder="John Doe"
                  {...bookForm.register("author", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Price */}
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="120"
                  {...bookForm.register("price", { required: true })}
                  readOnly={isReadOnly}
                />
              </div>

              {/* Status */}
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Switch
                  id="status"
                  checked={formValues.status}
                  onCheckedChange={(val) => bookForm.setValue("status", val)}
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </form>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </CardContent>

        <CardFooter>
          <Button variant="outline" className="me-2" type="button">
            Cancel
          </Button>
          {!isReadOnly && (
            <Button type="submit" variant="outline">
              Save
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
