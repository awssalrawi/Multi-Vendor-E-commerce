import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // resources: {
    //   en: {
    //     translation: {
    //       hello: "Hello",
    //     },
    //   },
    //   tr: {
    //     translation: {
    //       hello: "Merhaba",
    //     },
    //   },
    //   ar: {
    //     translation: {
    //       hello: "مرحبا",
    //     },
    //   },
    // },
    supportedLngs: ["en", "ar", "tr"],
    lng: "en",
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "querystring",
        "localStorage",
        "sessionStorage",
        "navigator",

        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locals/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });

export default i18next;
