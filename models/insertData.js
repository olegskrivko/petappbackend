// const Option = require("./optionModel");

// const populateOptions = async () => {
//   const sizes = [
//     {
//       key: "size",
//       values: [
//         {
//           value: 0,
//           translations: { en: "Small", lv: "Mazs", ru: "Маленький" },
//         },
//         {
//           value: 1,
//           translations: { en: "Medium", lv: "Vidējs", ru: "Средний" },
//         },
//         { value: 2, translations: { en: "Large", lv: "Liels", ru: "Большой" } },
//       ],
//     },
//     // Add more options as needed
//   ];

//   try {
//     // Clear existing options (optional)
//     await Option.deleteMany({});

//     // Insert new options
//     await Option.insertMany(sizes);

//     console.log("Options populated successfully.");
//   } catch (error) {
//     console.error("Error populating options:", error);
//   }
// };

// module.exports = populateOptions;
