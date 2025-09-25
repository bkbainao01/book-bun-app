import { create } from 'zustand'
import { getAll, getById, create as createAttachment, update, loadImage } from '@/services/attachmentService';
import { toast } from "sonner"

export const useAttachmentStore = create((set) => ({
  data: [],
  selectedData:  {},
  progress:0,
  getAll: async (params) => {
    try {
      const res = await getAll(params);
      set({ data: res.data, selectedData: {} });
      toast.success('Get All Attachment Success')
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  getById: async (params) => {
    try {
      const res = await getById(params);
      set({ data: [], selectedData: res.data });
      toast.success('Get Attachment Success')
      return res.data;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  create: async (params) => {
    try {
      const res = await createAttachment(params, (percent)=>set({ progress: percent }) );
      toast.success("Create Attachment Success");
      return res;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },

  update: async (params) => {
    try {
      const res = await update(params);
      toast.success("Update Attachment Success");
      return res;
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  loadImage: async (attachmentId) =>{
  try {
    const res = await loadImage(attachmentId);
    return res;
  } catch (err) {
    console.error("Load Image Failed", err);
  }
}
}))
