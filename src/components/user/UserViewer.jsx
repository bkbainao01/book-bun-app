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
import { useState } from "react"
import { useUserStore } from "@/stores/userStore"
import { useRoleStore } from "@/stores/roleStore"
import { useEffect } from "react"
import { useNavigate, useParams  } from "react-router-dom"
import TransferComponent from "@/components/Transfer"

export default function UserCreator({
  viewMode=true,
  isReadOnly=false
 }) {
  const navigation = useNavigate();
  const { id } = useParams();
  const userStore = useUserStore();
  const roleStore = useRoleStore();
  const getUserById = useUserStore(state => state.getById);
  const getAllRoles = useRoleStore(state => state.getAll);
  const roleList = roleStore.data;
  const userData = userStore.selectedData;

   const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    status: true,
    roleIds:[],
    roles:[],
  })
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    if (viewMode && id) {
      getUserById(id);
    }
    getAllRoles();
  }, [viewMode, id, getUserById, getAllRoles]);

  // 2. เมื่อ userData เปลี่ยน (หลังโหลด), ค่อย map เข้า form
  useEffect(() => {
    if (viewMode && userData?.id && roleList) {
      const roleIds = userData.roles.map((role)=> role.id)
      setLeft(roleList.filter((role)=> !roleIds.includes(role.id)));
      setRight(userData.roles);
      setFormData(prev => ({
        ...prev,
        firstname: userData.firstname,
        lastname: userData.lastname,
        status: userData.status,
        roles: userData.roles,
        roleIds: roleIds,
        email: userData.email,
      }));
    }
  }, [viewMode, userData, roleList]);


  const onFormDataChange = (key, value)=>{
    setFormData({...formData, [key]: value})
  }

  const onSubmit = ()=>{
    if(viewMode) {
      userStore.update(id, formData, navigation);
    } else {
      userStore.create(formData, navigation);
    }
  }

  const onTransferSelected = (obj) => {
    const roleIds = obj.right.map((x)=>x.id);
    setFormData((prevFormData) =>({ ...prevFormData, roleIds: roleIds, roles:obj.right }));
    setLeft(obj.left);
    setRight(obj.right);
  }

  return (
    <>
      <div className="user-creator">
        <Card className="card">
          <CardHeader>
            <CardTitle className="header">{ viewMode ? 'User' : 'New User' }</CardTitle>
            <CardDescription className="text-muted">
             { viewMode ? 'User information' : 'Enter form below to create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className={isReadOnly ? 'readonly': ''}  >
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@bookbun.com"
                    required
                    value={formData.email}
                    onChange={(e)=> onFormDataChange('email' , e.target.value)}
                  />
                </div>
                { !viewMode && <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required value={ formData.password } onChange={(e)=> onFormDataChange('password' , e.target.value) }/>
                </div>}
                <div className="grid gap-2">
                  <Label htmlFor="firstname">Firstname</Label>
                  <Input
                    id="firstname"
                    type="firstname"
                    placeholder="John"
                    value={formData.firstname}
                    onChange={(e)=>onFormDataChange('firstname' , e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="lastname">Lastname</Label>
                  </div>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastname}
                    onChange={(e)=>onFormDataChange('lastname' , e.target.value)}
                    required
                    />
                </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                    <Label htmlFor="lastname">Roles</Label>
                  </div>
                    <TransferComponent leftListProp={left} rightListProp={right} onTransferSelected={(value)=> onTransferSelected(value)} ></TransferComponent>
                  </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="status">Status</Label>
                  </div>
                  <Switch
                    id="status"
                    className={'size-xl'}
                    checked={formData.status}
                    onCheckedChange={(checked)=>onFormDataChange('status' , checked)}/>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline" className="button-cancel me-2">
              Cancel
            </Button>
            <Button type="submit" className="button-save" onClick={onSubmit}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
