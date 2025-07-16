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
import { useNavigate } from "react-router-dom"

const onEdit = (obj, navigate)=>{
  navigate(`/base-info/books/view/${obj.id}`)
}
const onPrint = (obj, navigate)=>{
  navigate(`/base-info/books/print/${obj.id}`)
}
const onDelete = (obj)=>{
  console.log("parent ==> OnDelete: ",obj)
}

const onNewBook = async (navigate)=>{
  navigate('/base-info/books/create/')
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
  const navigate = useNavigate();
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
            <Button className='button-new' onClick={()=>onNewBook(navigate)} ><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>New Book</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TableComponent
            tableName="book-table"
            headers={tableHeaders}
            columns={tableColumns}
            dataList={bookList}
            action={{ isAction:true, isEdit: true, isPrint:true, isDelete: true}}
            onEdit={(value)=>onEdit(value , navigate)}
            onPrint={(value)=>onPrint(value , navigate)}
            onDelete={(value)=>onDelete(value)}
          ></TableComponent>
        </CardContent>
        <CardFooter className="flex-col gap-2">
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
