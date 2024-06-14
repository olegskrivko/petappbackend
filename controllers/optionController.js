const Option = require("../models/optionModel");

const getAllOptions = async (req, res) => {
  try {
    const options = await Option.find().populate("values.translations");
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to handle creation of options with translations
const createOption = async (req, res) => {
  const { key, name, values } = req.body;
  // console.log(req.body, "req.body");
  console.log(name, "nameValue");
  try {
    // Check if the key already exists
    const existingOption = await Option.findOne({ key });
    if (existingOption) {
      return res
        .status(400)
        .json({ error: "Option with this key already exists" });
    }

    // Create a new option document
    const newOption = new Option({
      key,
      name: {
        en: name.en,
        lv: name.lv,
        ru: name.ru,
      },
      values: values.map(({ value, en, lv, ru }) => ({
        value,
        translations: {
          en,
          lv,
          ru,
        },
      })),
    });

    // Save the new option to the database
    const savedOption = await newOption.save();
    res.status(201).json(savedOption); // Respond with the saved option
  } catch (error) {
    console.error("Error creating option:", error);
    res.status(500).json({ error: "Server error" }); // Handle server error
  }
};

// Controller function to handle creation of options with translations
// const createOption = async (req, res) => {
//   const { key, name, values } = req.body;
//   console.log(req.body, "req.body");
//   try {
//     // Check if the key already exists
//     const existingOption = await Option.findOne({ key });
//     if (existingOption) {
//       return res
//         .status(400)
//         .json({ error: "Option with this key already exists" });
//     }

//     // Create a new option document
//     const newOption = new Option({
//       key,
//       name,
//       values: values.map(({ value, en, lv, ru }) => ({
//         value,
//         translations: [
//           { language: "en", value: en },
//           { language: "lv", value: lv },
//           { language: "ru", value: ru },
//         ],
//       })),
//     });
//     console.log(newOption, "newOption");
//     // Save the new option to the database
//     const savedOption = await newOption.save();
//     res.status(201).json(savedOption); // Respond with the saved option
//   } catch (error) {
//     console.error("Error creating option:", error);
//     res.status(500).json({ error: "Server error" }); // Handle server error
//   }
// };

// Controller function to handle creation of options with translations
// const createOption = async (req, res) => {
//   const { key, name, values } = req.body;
//   console.log(req.body, "req.body");
//   try {
//     // Check if the key already exists (you can modify this validation as per your needs)
//     const existingOption = await Option.findOne({ key });
//     if (existingOption) {
//       return res
//         .status(400)
//         .json({ error: "Option with this key already exists" });
//     }

//     // Create a new option document
//     const newOption = new Option({
//       key,
//       name,
//       values,
//     });

//     // Save the new option to the database
//     const savedOption = await newOption.save();
//     res.status(201).json(savedOption); // Respond with the saved option
//   } catch (error) {
//     console.error("Error creating option:", error);
//     res.status(500).json({ error: "Server error" }); // Handle server error
//   }
// };

// const createOption = async (req, res) => {
//   try {
//     // Destructure key, name, and values from req.body
//     const { key, name, values } = req.body;

//     // Ensure values are structured correctly with translations
//     const newValues = values.map((value) => ({
//       value: value.value,
//       translations: {
//         en: value.en,
//         lv: value.lv,
//         ru: value.ru,
//       },
//     }));

//     // Create new Option document
//     const newOption = new Option({
//       key,
//       name,
//       values: newValues,
//     });

//     // Save newOption to database
//     await newOption.save();

//     // Respond with the saved newOption
//     res.status(201).json(newOption);
//   } catch (err) {
//     console.error("Error creating option:", err);
//     res.status(400).json({ error: "Validation error" });
//   }
// };

const getOptionById = async (req, res) => {
  const slug = req.params.slug;
  console.log(slug, "slug");
  try {
    // Query the Option collection based on the key matching the slug parameter
    const options = await Option.find({ key: slug })
      .lean() // Convert the Mongoose document to a plain JavaScript object
      .select("-__v") // Exclude the __v field from the response
      .populate({
        path: "values",
        select: "-_id", // Exclude _id and __v fields from translations
      });

    // console.log(
    //   options[0].values[0].translations,
    //   "options from getOptionById"
    // );
    console.log(options, "options from getOptionById");

    // Construct a more structured response for the frontend
    const formattedOptions = options.map((option) => ({
      _id: option._id,
      key: option.key,
      name: {
        en: option.name.en,
        lv: option.name.lv,
        ru: option.name.ru,
      },
      values: option.values.map((value) => ({
        value: value.value,
        translations: {
          en: value.translations.en,
          lv: value.translations.lv,
          ru: value.translations.ru,
        },
      })),
    }));

    if (options.length === 0) {
      return res
        .status(404)
        .json({ error: "Options not found for the given slug" });
    }
    console.log(formattedOptions, "formattedOptions");
    res.status(200).json({ options: formattedOptions });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateOption = async (req, res) => {
  try {
    const updatedOption = await Option.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOption) {
      return res.status(404).json({ error: "Option not found" });
    }
    res.status(200).json(updatedOption);
  } catch (err) {
    res.status(400).json({ error: "Validation error" });
  }
};

const deleteOption = async (req, res) => {
  try {
    const deletedOption = await Option.findByIdAndDelete(req.params.id);
    if (!deletedOption) {
      return res.status(404).json({ error: "Option not found" });
    }
    res.status(200).json({ message: "Option deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllOptions,
  createOption,
  getOptionById,
  updateOption,
  deleteOption,
};
