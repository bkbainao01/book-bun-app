import { create } from 'zustand'
import { toast } from "sonner"
import i18next from 'i18next'

export const useLanguageStore = create((set) => ({
  selectedLang:   i18next.language || 'en',
  setLang: async (value) => {
    try {
      i18next.changeLanguage(value)
      set({ selectedLang: value });
      return value;
    } catch (error) {
      console.log("🚀 ~ error:", error)
      toast.error('fail set lang');
    }
  },
}))
