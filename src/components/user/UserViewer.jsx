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


function onFormDataChange ({key, value, setFormData, formData}) {
  setFormData({...formData, [key]: value})
}

function onSubmit({ viewMode, userStore, id, formData, navigation }) {
  if(viewMode) {
    userStore.update(id, formData, navigation);
  } else {
    userStore.create(formData, navigation);
  }
}
function onTransferSelected({obj, setFormData, setLeft,setRight}) {
  const roleIds = obj.right.map((x)=>x.id);
  setFormData((prevFormData) =>({ ...prevFormData, roleIds: roleIds, roles:obj.right }));
  setLeft(obj.left);
  setRight(obj.right);
}

export default function UserCreator({ viewMode=true, isReadOnly=false}) {
  // vars
  const navigation = useNavigate();
  const { id } = useParams();
  const userStore = useUserStore();
  const roleStore = useRoleStore();
  const getUserById = useUserStore(state => state.getById);
  const getAllRoles = useRoleStore(state => state.getAll);
  const roleList = roleStore.data;
  const userData = userStore.selectedData;
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
   const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    status: true,
    roleIds:[],
    roles:[],
  })

  // useEffect
  // get all data
  useEffect(() => {
    if (viewMode && id) {
      getUserById(id);
    }
    getAllRoles();
  }, [viewMode, id, getUserById, getAllRoles]);

  // 2. เมื่อ userData เปลี่ยน (หลังโหลด), ค่อย map เข้า form
  useEffect(() => {
    if (viewMode && userData?.id && roleList) {
      const roleIds = userData?.roles?.map((role)=> role.id)
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
            <div className="grid grid-cols-12 gap-5 ">
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="email" className={'form-label'}>Email</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@bookbun.com"
                  required
                  value={formData.email}
                  onChange={(e)=> onFormDataChange({ key:'email' , value: e.target.value, setFormData, formData})}
                />
              </div>
              { !viewMode && (<>
                <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                  <Label htmlFor="password" className={'form-label'}>Password</Label>
                </div>
                <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                  <Input
                    id="password"
                    type="password"
                    required
                    value={ formData.password }
                    onChange={
                      (e)=> onFormDataChange(
                        { key:'password' , value: e.target.value, setFormData, formData}
                        )
                    }/>
                </div>
              </>
              )}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="firstname" className={'form-label'}>Firstname</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                    id="firstname"
                    type="firstname"
                    placeholder="John"
                    value={formData.firstname}
                    onChange={(e)=>onFormDataChange({ key:'firstname' , value: e.target.value, setFormData, formData })}
                    required
                  />
              </div>
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="lastname" className={'form-label'}>Lastname</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                    id="lastname"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastname}
                    onChange={(e)=>onFormDataChange({ key:'lastname' , value:e.target.value, setFormData, formData})}
                    required
                    />
              </div>
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="lastname" className={'form-label'}>Roles</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <TransferComponent
                  leftListProp={left}
                  rightListProp={right}
                  onTransferSelected={
                    (obj)=>onTransferSelected({obj, setFormData, setLeft,setRight})
                  }
                />
              </div>
              <div className="col-span-12 self-center md:col-span-3 lg:col-span-2 ">
                <Label htmlFor="status" className={'form-label'}>Status</Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                  <Switch
                    id="status"
                    className={'size-xl mt-1'}
                    checked={formData.status}
                    onCheckedChange={(checked)=>onFormDataChange({key:'status' ,value: checked, setFormData, formData})}/>
              </div>
            </div>
            </form>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline" className="button-cancel me-2">
              Cancel
            </Button>
            <Button
              type="submit"
              className="button-save"
              onClick={()=> onSubmit({ viewMode, userStore, id, formData, navigation })}>
                Save
              </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
