// models/optionModel.js
const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  en: { type: String, required: true }, // English
  lv: { type: String, required: true }, // Latvian
  ru: { type: String, required: true }, // Russian
});

const nameTranslationsSchema = new mongoose.Schema({
  en: { type: String, required: true },
  lv: { type: String, required: true },
  ru: { type: String, required: true },
});

const optionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  name: {
    type: nameTranslationsSchema, // Use the translationSchema for the name field
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

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
// const mongoose = require("mongoose");

// const translationSchema = new mongoose.Schema(
//   {
//     en: { type: String, required: true }, // English
//     lv: { type: String, required: true }, // Latvian
//     ru: { type: String, required: true }, // Russian
//   },
//   { _id: false }
// ); // Disable _id for translations

// const optionSchema = new mongoose.Schema({
//   key: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   values: [
//     {
//       value: {
//         type: Number,
//         required: true,
//       },
//       translations: translationSchema,
//     },
//   ],
// });

// const Option = mongoose.model("Option", optionSchema);

// module.exports = Option;
// const mongoose = require("mongoose");

// const translationSchema = new mongoose.Schema(
//   {
//     language: { type: String, required: true },
//     value: { type: String, required: true },
//   },
//   { _id: false }
// );

// const optionSchema = new mongoose.Schema({
//   key: { type: String, required: true },
//   name: { type: String, required: true },
//   values: [
//     {
//       value: { type: Number, required: true },
//       translations: [translationSchema], // Array of translations for each value
//     },
//   ],
// });

// const Option = mongoose.model("Option", optionSchema);

// module.exports = Option;
