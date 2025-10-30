import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import uk from "./locales/uk.json";

// 1️⃣ Визначаємо мову браузера
const browserLang = (navigator.language || navigator.languages[0] || "en").toLowerCase();
const detectedLang = browserLang.startsWith("uk") ? "uk" : "en";

// 2️⃣ Зчитуємо збережене значення (якщо користувач уже вибирав)
const savedLang = localStorage.getItem("lang");

// 3️⃣ Встановлюємо реальну мову
const initialLang = savedLang || detectedLang;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
    lng: initialLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

// 4️⃣ Зберігаємо у localStorage при зміні
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;
