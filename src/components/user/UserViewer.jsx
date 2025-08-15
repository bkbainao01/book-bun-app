import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useRoleStore } from "@/stores/roleStore";
import { useNavigate, useParams } from "react-router-dom";
import TransferComponent from "@/components/Transfer";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

export default function UserCreator({ viewMode = true, isReadOnly = false }) {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { id } = useParams();
  const userStore = useUserStore();
  const roleStore = useRoleStore();
  const getUserById = useUserStore((state) => state.getById);
  const getAllRoles = useRoleStore((state) => state.getAll);
  const roleList = roleStore.data;
  const userData = userStore.selectedData;

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  // react-hook-form
  const initFormData = {
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      status: true,
      roleIds: [],
      roles: [],
    }
  const { register, handleSubmit, setValue, watch, reset } = useForm({defaultValues: initFormData});

  // โหลดข้อมูลผู้ใช้และ role
  useEffect(() => {
    if (viewMode && id) {
      getUserById(id);
    }
    getAllRoles();
  }, [viewMode, id, getUserById, getAllRoles]);

  // Map userData -> form values
  useEffect(() => {
    if (viewMode && userData?.id && roleList) {
      const roleIds = userData?.roles?.map((role) => role.id) || [];
      setLeft(roleList.filter((role) => !roleIds.includes(role.id)));
      setRight(userData.roles);

      reset({
        firstname: userData.firstname || null,
        lastname: userData.lastname || null,
        email: userData.email || null,
        status: userData.status ?? true,
        roleIds,
        roles: userData.roles || [],
      });
    } else if (roleList) {
      setLeft(roleList);
    }
  }, [viewMode, userData, roleList, reset]);

  // Transfer select handler
  const onTransferSelected = (obj) => {
    const roleIds = obj.right.map((x) => x.id);
    setValue("roleIds", roleIds);
    setValue("roles", obj.right);
    setLeft(obj.left);
    setRight(obj.right);
  };

  // submit handler
  const onSubmit = (data) => {
    if (viewMode) {
      userStore.update(id, data, navigation);
    } else {
      userStore.create(data, navigation);
    }
  };

  return (
    <div className="user-creator">
      <Card className="card">
        <CardHeader>
          <CardTitle className="header">
            {viewMode ? "User" : "New User"}
          </CardTitle>
          <CardDescription className="text-muted">
            {viewMode
              ? "User information"
              : "Enter form below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="user-form"
            className={isReadOnly ? "readonly" : ""}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-12 gap-5 ">
              {/* Email */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="email" className="form-label">
                  {t("form.email")}
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@bookbun.com"
                  required
                  {...register("email")}
                />
              </div>

              {/* Password (only create mode) */}
              {!viewMode && (
                <>
                  <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                    <Label htmlFor="password" className="form-label">
                      {t("form.password")}
                    </Label>
                  </div>
                  <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                    <Input
                      id="password"
                      type="password"
                      required
                      {...register("password")}
                    />
                  </div>
                </>
              )}

              {/* Firstname */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="firstname" className="form-label">
                  {t("form.firstname")}
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="firstname"
                  type="text"
                  placeholder="John"
                  required
                  {...register("firstname")}
                />
              </div>

              {/* Lastname */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="lastname" className="form-label">
                  {t("form.lastname")}
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                  required
                  {...register("lastname")}
                />
              </div>

              {/* Roles */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center">
                <Label htmlFor="roles" className="form-label">
                  {t("form.roles")}
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <TransferComponent
                  leftListProp={left}
                  rightListProp={right}
                  onTransferSelected={onTransferSelected}
                />
              </div>

              {/* Status */}
              <div className="col-span-12 self-center md:col-span-3 lg:col-span-2 ">
                <Label htmlFor="status" className="form-label">
                  {t("form.status")}
                </Label>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
                <Switch
                  id="status"
                  className="size-xl mt-1"
                  checked={watch("status")}
                  onCheckedChange={(checked) => setValue("status", checked)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="md:justify-end px-0">
          <Button
            variant="outline"
            className="button-cancel me-2"
            type="button"
            onClick={() => navigation(-1)}
          >
            {t("button.cancel")}
          </Button>
          <Button type="submit" className="button-save" form="user-form">
            {t("button.save")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
