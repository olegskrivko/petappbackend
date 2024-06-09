// const i18next = require("i18next");
// const Backend = require("i18next-fs-backend");
// const i18nextMiddleware = require("i18next-express-middleware");
// const path = require("path");

const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const path = require("path");

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}.json"),
    },
    fallbackLng: "en",
    preload: ["en", "ru", "lv"], // Preload the supported languages
    detection: {
      order: ["querystring", "cookie", "header"],
      caches: ["cookie"],
    },
    supportedLngs: ["en", "ru", "lv"], // Define supported languages
    saveMissing: true,
  });

module.exports = i18next;
