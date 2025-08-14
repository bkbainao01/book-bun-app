import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import thLang from './lang-th.json'
import enLang from './lang-en.json'

i18next
.use(initReactI18next)
.use(LanguageDetector)
.init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,        // React ป้องกัน XSS อยู่แล้ว
    },
    resources: {
      en: { translation: enLang },
      th: { translation: thLang },
    },
})