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
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useUserStore } from "@/stores/userStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPlus, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons"
import TableComponent from "@/components/TableComponent"

const onNewUser = async (navigate)=>{
  navigate('/base-info/users/create/')
}

const onEdit = (value)=>{
  console.log("parent ==> OnEdit: ",value)
}
const onPrint = (value)=>{
  console.log("parent ==> OnPrint: ", value)
}
const onDelete = (value)=>{
  console.log("parent ==> OnDelete: ",value)
}

const tableHeaders = [
              {
                name:'Firstname',
                width:'',
                class: '',
              },
              {
                name:'Lastname',
                width:'',
                class: '',
              }, {
                name:'Email',
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
    name: 'firstname',
    class:''
  },
  {
    name: 'lastname',
    class:''
  },
  {
    name: 'email',
    class:''
  },
  {
    name: 'status',
    class:''
  },
]


export default function UserList() {
  const navigate = useNavigate();
  const userStore = useUserStore();  // <-- reactive แล้ว
  const getAllBooks = useUserStore(state => state.getAll);
  const userList = userStore.data;
  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);


  return (
    <>
    <div className="book-list">
      <Card className="card">
        <CardHeader>
          <CardTitle className={'text-start header'}>Users</CardTitle>
          <CardDescription className={'text-start text-muted'}  >Users Information</CardDescription>
          <CardAction onClick={()=>onNewUser(navigate) }>
            <Button className="button-new"><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>New User</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TableComponent
          tableName="user-table"
            headers={tableHeaders}
            columns={tableColumns}
            dataList={userList}
            action={{ isAction:true, isEdit: true, isPrint:true, isDelete: true}}
            onEdit={(value)=>onEdit(value, navigate)}
            onPrint={(value)=>onPrint(value, navigate)}
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
