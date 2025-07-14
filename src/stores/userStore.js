import { create } from 'zustand'
import { getAll, getById } from '@/services/userService';
import { toast } from "sonner"


export const useUserStore = create((set) => ({
  data: [],
  selectedData:  {},
  getAll: async (params) => {
    try {
      const res = await getAll(params);
      set({ data: res, selectedData: {} });
      toast.success("Get All Users Success");
      return res.data;
    } catch (error) {
      console.error("UserStore-getAll() Error:",error.message);
      toast.success("Get All Users Failed");
    }
  },
  getById: async (params) => {
    try {
      const res = await getById(params);
      set({ data: [], selectedData: res.data });
      toast.success("Get User Success");
      return res.data;
    } catch (error) {
      console.error("UserStore-getById() Error:",error.message);
      toast.success("Get User Failed");
    }
  },
}))
