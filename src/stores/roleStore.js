import { create } from 'zustand'
import { getAll, getById } from '@/services/roleService';
import { toast } from "sonner"

export const useRoleStore = create((set) => ({
  data: [],
  selectedData:  {},
  getAll: async (params) => {
    try {
      const res = await getAll(params);
      set({ data: res.data, selectedData: {} });
      toast.success('Get All Roles Success')
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  getById: async (params) => {
    try {
      const res = await getById(params);
      set({ data: [], selectedData: res.data });
      toast.success('Get Role Success')
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
}))
