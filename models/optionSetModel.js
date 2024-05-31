// models/optionSetModel.js
const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  en: { type: String, required: true }, // English
  lv: { type: String, required: true }, // Latvian
  ru: { type: String, required: true }, // Russian
  // Add other languages as needed
});

const optionSetSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  values: [
    {
      value: {
        type: Number, // or String if you prefer
        required: true,
      },
      translations: translationSchema,
    },
  ],
});

const OptionSet = mongoose.model("OptionSet", optionSetSchema);

module.exports = OptionSet;

// Sample Data
// const sizesOptionSet = new OptionSet({
//     key: "size",
//     values: [
//       { value: 0, translations: { en: "Small", es: "Pequeño", fr: "Petit" } },
//       { value: 1, translations: { en: "Medium", es: "Mediano", fr: "Moyen" } },
//       { value: 2, translations: { en: "Large", es: "Grande", fr: "Grand" } },
//     ],
//   });

//   const genderOptionSet = new OptionSet({
//     key: "gender",
//     values: [
//       { value: 0, translations: { en: "Male", es: "Macho", fr: "Mâle" } },
//       { value: 1, translations: { en: "Female", es: "Hembra", fr: "Femelle" } },
//     ],
//   });

//   const statusOptionSet = new OptionSet({
//     key: "status",
//     values: [
//       { value: 0, translations: { en: "Found", es: "Encontrado", fr: "Trouvé" } },
//       { value: 1, translations: { en: "Lost", es: "Perdido", fr: "Perdu" } },
//       { value: 2, translations: { en: "Seen", es: "Visto", fr: "Vu" } },
//     ],
//   });

//   // Save all option sets
//   sizesOptionSet.save();
//   genderOptionSet.save();
//   statusOptionSet.save();
