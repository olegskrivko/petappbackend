// populateOptions.js
const mongoose = require("mongoose");
const Option = require("./models/optionModel");

mongoose
  .connect("mongodb://localhost:27017/yourdatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    return seedDatabase();
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));

async function seedDatabase() {
  const sizesOption = new Option({
    key: "size",
    values: [
      { value: 0, translations: { en: "Small", lv: "Mazs", ru: "Маленький" } },
      { value: 1, translations: { en: "Medium", lv: "Vidējs", ru: "Средний" } },
      { value: 2, translations: { en: "Large", lv: "Liels", ru: "Большой" } },
    ],
  });

  const genderOption = new Option({
    key: "gender",
    values: [
      { value: 0, translations: { en: "Male", lv: "Vīrietis", ru: "Мужчина" } },
      {
        value: 1,
        translations: { en: "Female", lv: "Sieviete", ru: "Женщина" },
      },
    ],
  });

  const statusOption = new Option({
    key: "status",
    values: [
      { value: 0, translations: { en: "Found", lv: "Atrasts", ru: "Найден" } },
      { value: 1, translations: { en: "Lost", lv: "Pazudis", ru: "Потерян" } },
      { value: 2, translations: { en: "Seen", lv: "Redzēts", ru: "Видел" } },
    ],
  });

  await sizesOption.save();
  await genderOption.save();
  await statusOption.save();

  console.log("Options saved");
  mongoose.connection.close();
}
