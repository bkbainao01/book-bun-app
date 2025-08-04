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
import { useCallback } from "react"

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
  })


   useEffect(() => {
    if(viewMode){
      getUserById(id);
      // setFormData(prevFormData => ({
      //   ...prevFormData,
      //   firstname: userData.firstname,
      //   lastname: userData.lastname,
      //   status: userData.status,
      //   roleIds: userData.roleIds,
      //   email: userData.email
      // }));
    }
    getAllRoles();
    }, [getUserById, viewMode, getAllRoles, id, setFormData]);

  const onFormDataChange = (key, value)=>{
    setFormData({...formData, [key]: value})
  }

  const onSubmit = ()=>{
    userStore.create(formData, navigation);
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
                    onChange={(e)=>onFormDataChange('email' , e.target.value)}
                  />
                </div>
                { !viewMode && <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required value={ formData.password } onChange={(e)=>onFormDataChange('password' , e.target.value)}/>
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
                    <TransferComponent dataList={roleList}></TransferComponent>
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
