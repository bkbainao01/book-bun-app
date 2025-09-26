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
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/stores/userStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import TableDataComponent from "@/components/TableDataComponent"

function onNewUser(navigate) {
  navigate('/base-info/users/create/')
}

function onEdit(value, navigate) {
  if (value?.id && navigate) {
    navigate(`/base-info/users/view/${value.id}`);
  }
}

function onPrint(value) {
  console.log("parent = OnPrint: ", value)
}

async function onDelete(value, deleteUser) {
  await deleteUser(value.original.id);
}

const tableColumns = [
  {
    key: 'firstName',
    type: 'string',
    title: 'Firstname',
    class: ''
  },
  {
    key: 'lastName',
    type: 'string',
    title: 'Lastname',
    class: ''
  },
  {
    key: 'email',
    type: 'string',
    class: ''
  },
  {
    key: 'roles',
    type: 'roles',
    class: ''
  },
  {
    key: 'status',
    type: 'status',
    class: ''
  },
]


export default function UserList() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const getAllBooks = useUserStore(state => state.getAll);
  const deleteUser = useUserStore(state => state.deleteUser);
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
            <CardAction onClick={() => onNewUser(navigate)}>
              <Button className="button-new"><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>New User</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <TableDataComponent
              tableName="user-table"
              tableColumns={tableColumns}
              dataList={userList}
              action={{ isAction: true, isEdit: true, isPrint: false, isDelete: true }}
              onEdit={(value) => onEdit(value, navigate)}
              onPrint={(value) => onPrint(value, navigate)}
              onDelete={(value) => onDelete(value, deleteUser)}
            ></TableDataComponent>
          </CardContent>
          <CardFooter className="flex-col gap-2">
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
