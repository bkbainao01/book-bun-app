import { create } from 'zustand'
import { getAll, getById, create as createUser, update } from '@/services/userService';
import { toast } from "sonner"
import { replace } from 'react-router-dom';


export const useUserStore = create((set) => ({
  data: [],
  selectedData:  {},
  getAll: async (params) => {
    try {
      const res = await getAll(params);
      set({ data: res.data, selectedData: {} });
      toast.success("Get All Users Success");
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  getById: async (id) => {
    try {
      const res = await getById(id);
      set({ data: [], selectedData: res.data });
      toast.success("Get User Success");
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  create: async (params,navigate) => {
    try {
      const res = await createUser(params);
      set({ data: [], selectedData: res.data });
      toast.success("Create User Success");
      if(navigate) {
        navigate('/base-info/users',{ replace:true })
      }
      return;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  update: async (id, payload, navigate) => {
    try {
      const res = await update(id, payload);
      set({ data: [], selectedData: res.data });
      toast.success("Update User Success");
      if(navigate) {
        navigate('/base-info/users',{ replace:true })
      }
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
}))
