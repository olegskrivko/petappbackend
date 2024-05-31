// // controllers/optionSetController.js

// const OptionSet = require("../models/optionSetModel");

// // Controller function to add new options
// exports.addOption = async (req, res) => {
//   try {
//     const { key, value, translations } = req.body;

//     // Check if the option key already exists
//     let optionSet = await OptionSet.findOne({ key });

//     if (!optionSet) {
//       // If the option key doesn't exist, create a new option set
//       optionSet = new OptionSet({ key, values: [{ value, translations }] });
//     } else {
//       // If the option key exists, update the values
//       optionSet.values.push({ value, translations });
//     }

//     // Save the option set
//     await optionSet.save();

//     res.status(201).json({ success: true, data: optionSet });
//   } catch (error) {
//     console.error("Error adding option:", error);
//     res.status(500).json({ success: false, error: "Server Error" });
//   }
// };
// controllers/optionSetController.js

// const OptionSet = require("../models/optionSetModel");

// // Controller function to add new options
// exports.addOption = async (req, res) => {
//   try {
//     const { key, value, translations } = req.body;

//     // Check if the option key already exists
//     let optionSet = await OptionSet.findOne({ key });

//     if (!optionSet) {
//       // If the option key doesn't exist, create a new option set
//       optionSet = new OptionSet({ key, values: [{ value, translations }] });
//     } else {
//       // If the option key exists, update the values
//       optionSet.values.push({ value, translations });
//     }

//     // Save the option set
//     await optionSet.save();

//     res.status(201).json({ success: true, data: optionSet });
//   } catch (error) {
//     console.error("Error adding option:", error);
//     res.status(500).json({ success: false, error: "Server Error" });
//   }
// };
// controllers/optionSetController.js

const OptionSet = require("../models/optionSetModel");

// Controller function to save new options
exports.createOption = async (req, res) => {
  try {
    const { key, value, translations } = req.body;

    // Create a new OptionSet document
    const newOption = new OptionSet({
      key,
      values: [{ value, translations }],
    });

    // Save the new option to the database
    const savedOption = await newOption.save();

    res.status(201).json(savedOption);
  } catch (error) {
    console.error("Error creating option:", error);
    res.status(500).json({ error: "Server error" });
  }
};
