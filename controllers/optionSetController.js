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
