import { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useBookStore } from "@/stores/bookStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPlus, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons"
import TableComponent from "@/components/TableComponent"

const onEdit = ()=>{
  console.log("OnEdit")
}
const onPrint = ()=>{
  console.log("OnPrint")
}
const onDelete = ()=>{
  console.log("OnDelete")
}

const tableHeaders = [
              {
                name:'Name',
                width:'',
                class: '',
              },
              {
                name:'Author',
                width:'',
                class: '',
              }, {
                name:'Price',
                width:'',
                class: '',
              }, {
                name:'Status',
                width:'',
                class: '',
              }, {
                name:'Action',
                width:'',
                class: '',
              }
            ];

const tableColumns = [
  {
    name: 'name',
    class:''
  },
  {
    name: 'author',
    class:''
  },
  {
    name: 'price',
    class:''
  },
  {
    name: 'status',
    class:''
  },
]


export default function BookList() {
  const bookStore = useBookStore();
  const getAllBooks = useBookStore(state => state.getAll);
  const bookList = bookStore.data;
  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);
  let totalPrice = 0;
  bookList.forEach((item)=>{
    totalPrice += item.price
  })


  return (
    <>
    <div className="book-list">
      <Card className="card">
        <CardHeader>
          <CardTitle className={'text-start header'}>Books</CardTitle>
          <CardDescription className={'text-start text-muted'} >Books Information</CardDescription>
          <CardAction>
            <Button variant="outline"><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon> New Book</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TableComponent
            headers={tableHeaders}
            columns={tableColumns}
            dataList={bookList}

          ></TableComponent>
        </CardContent>
        <CardFooter className="flex-col gap-2">
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
