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

const onNewUser = async (navigate)=>{
  console.log("🚀 ~ onNewUser ~ navigate")
  navigate('/base-info/users/create/')
}

const onEdit = async ()=>{
  console.log("OnEdit")
}
const onPrint = async ()=>{
  console.log("OnPrint")
}
const onDelete = async ()=>{
  console.log("OnDelete")
}


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
            <Button variant="outline"><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>New User</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Firstname</TableHead>
                <TableHead>Lastname</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell className="">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500 text-white dark:bg-blue-600"
                    >
                      Ready
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" className={'me-2'} onClick={ ()=>onEdit() }><FontAwesomeIcon icon={faPen} ></FontAwesomeIcon></Button>
                    <Button variant="outline" className={'me-2'} onClick={ ()=>onPrint() } ><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></Button>
                    <Button variant="outline" onClick={ ()=>onDelete() } ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex-col gap-2">
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
