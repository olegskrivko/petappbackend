// const path = require("path");
// const fs = require("fs");

// const translationsDirectory = path.join(__dirname, "../locales");

// const translationController = {
//   getTranslation: (req, res) => {
//     const lang = req.params.lang;
//     const filePath = path.join(translationsDirectory, `${lang}.json`);

//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         console.error("Error reading translation file:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//       try {
//         const translations = JSON.parse(data);
//         res.json(translations);
//       } catch (error) {
//         console.error("Error parsing translation file:", error);
//         res.status(500).json({ error: "Internal server error" });
//       }
//     });
//   },

//   // You can add more methods as needed for translation management
//   // For example, updating translations, adding new translations, etc.
// };

// module.exports = translationController;

const path = require("path");
const fs = require("fs");

const translationsDirectory = path.join(__dirname, "../locales");

const translationController = {
  getTranslation: (req, res) => {
    const lang = req.headers["accept-language"] || "en"; // Default to English if header is not provided
    console.log(lang, "lang");
    const filePath = path.join(translationsDirectory, `${lang}.json`);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading translation file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      try {
        const translations = JSON.parse(data);
        res.json(translations);
      } catch (error) {
        console.error("Error parsing translation file:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  },

  // You can add more methods as needed for translation management
  // For example, updating translations, adding new translations, etc.
};

module.exports = translationController;
