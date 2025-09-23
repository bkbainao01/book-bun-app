import { create } from 'zustand'
import { getAll, getById, create as createBook, update, deleteBook } from '@/services/bookService';
import { toast } from "sonner"

export const useBookStore = create((set) => ({
  data: [],
  selectedData:  {},
  getAll: async (params) => {
    try {
      const res = await getAll(params);
      set({ data: res.data, selectedData: {} });
      toast.success('Get All Books Success')
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  getById: async (params) => {
    try {
      const res = await getById(params);
      set({ data: [], selectedData: res.data });
      toast.success('Get Book Success')
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  create: async (params,navigate) => {
    try {
      const res = await createBook(params);
      set({ data: [], selectedData: res.data });
      toast.success("Create Books Success");
      if(navigate) {
        navigate('/base-info/books',{ replace:true })
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
      toast.success("Update Book Success");
      if(navigate) {
        navigate('/base-info/books',{ replace:true })
      }
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  deleteBook: async (id) => {
    try {
      const res = await deleteBook(id);
      toast.success("Delete Book Success");
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
}))
