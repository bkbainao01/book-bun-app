import { useEffect } from "react"
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
import { useBookStore } from "@/stores/bookStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import TableDataComponent from "@/components/TableDataComponent"
import { useNavigate } from "react-router-dom"

const onEdit = (obj, navigate)=>{
  navigate(`/base-info/books/view/${obj.id}`)
}

const onPrint = (obj, navigate)=>{
  navigate(`/base-info/books/print/${obj.id}`)
}

const onDelete = async (obj, deleteBook)=>{
  await deleteBook(obj.original.id);
}

const onNewBook = async (navigate)=>{
  navigate('/base-info/books/create/')
}

const tableColumns = [
  {
    key: 'nameTh',
    title:'Name (TH)',
    type:'string',
    class:''
  },
  {
    key: 'nameEn',
    title:'Name (En)',
    type:'string',
    class:''
  },
  {
    key: 'author',
    title:'Author',
    type:'string',
    class:''
  },
  {
    key: 'publisher',
    title:'Publisher',
    type:'string',
    class:''
  },
  {
    key: 'publishAt',
    title:'Publish Date',
    type:'date',
    class:''
  },
  {
    key: 'price',
    title:'Price',
    type:'string',
    class:''
  },
  {
    key: 'status',
    type:'status',
    class:''
  },
]

const filters = [
  {
    key: 'nameTh',
    title:'Name (TH)',
    type:'string',
    placeholder: 'Filter Name TH',
    class:''
  },
  {
    key: 'nameEn',
    title:'Name (En)',
    type:'string',
    placeholder: 'Filter Name EN',
    class:''
  },
  {
    key: 'author',
    title:'Author',
    type:'string',
    placeholder: 'Filter Author',
    class:''
  },
  {
    key: 'publisher',
    title:'Publisher',
    type:'string',
    placeholder: 'Filter Publisher',
    class:''
  },
  {
    key: 'publishAt',
    title:'Publish Date',
    type:'date',
    placeholder: 'Filter Publish Date',
    class:''
  },
  {
    key: 'price',
    title:'Price',
    type:'string',
    placeholder: 'Filter Price',
    class:''
  },
  {
    key: 'status',
    type:'enum',
    placeholder: 'Filter Status',
    class:''
  },
  {
    key: 'keyword',
    type:'keyword',
    placeholder: 'Filter Name En, Name TH, Author, Publisher',
    class:''
  },
]

export default function BookList() {
  const navigate = useNavigate();
  const bookStore = useBookStore();
  const getAllBooks = useBookStore(state => state.getAll);
  const deleteBook = useBookStore(state => state.deleteBook);
  const bookList = bookStore.data;

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  return (
      <>
      <div className="book-list">
        <Card className="card">
          <CardHeader>
            <CardTitle className={'text-start header'}>Books</CardTitle>
            <CardDescription className={'text-start text-muted'}  >Books Information</CardDescription>
            <CardAction onClick={()=>onNewBook(navigate) }>
              <Button className="button-new"><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>New Book</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <TableDataComponent
              tableName="user-table"
              tableColumns={tableColumns}
              dataList={bookList}
              filters={filters}
              action={{ isAction:true, isEdit: true, isPrint:false, isDelete: true}}
              onEdit={(value)=>onEdit(value, navigate)}
              onPrint={(value)=>onPrint(value, navigate)}
              onDelete={(value)=>onDelete(value, deleteBook)}
            ></TableDataComponent>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
        </Card>
      </div>
      </>
    )
}
