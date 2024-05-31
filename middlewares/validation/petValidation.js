// middlewares/validation/petValidation.js
const { body } = require("express-validator");
const Pet = require("../../models/petModel");

const validateCreatePet = [
  // body("name").notEmpty().withMessage("Pet name is required"),
  // .trim()
  // .isLength({ max: 50 })
  // .withMessage("Pet name must be less than 50 characters")
  // .custom(async (value, { req }) => {
  //   // Skip further checks if the title is empty or null
  //   if (!value) {
  //     return true;
  //   }
  //   // Perform the pattern and database checks together
  //   const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
  //   const existingPet = await Pet.findOne({ name: value });
  //   if (!patternMatch) {
  //     throw new Error(
  //       "Pet name can only contain letters, spaces and hyphens"
  //     );
  //   }
  //   if (existingPet) {
  //     throw new Error("Pet name already exists");
  //   }
  //   return true;
  // }),
  // body("description")
  //   .notEmpty()
  //   .withMessage("Pet description is required")
  //   .trim()
  //   .isLength({ max: 250 })
  //   .withMessage("Pet description must be less than 250 characters"),
];

const validateUpdatePet = [
  // body("name")
  //   .notEmpty()
  //   .withMessage("Pet name cannot be empty")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet name must be less than 50 characters")
  //   .custom(async (value, { req }) => {
  //     if (!value.trim()) {
  //       throw new Error("Pet name is required");
  //     }
  //     const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
  //     const existingPet = await Pet.findOne({ name: value });
  //     if (!patternMatch) {
  //       throw new Error(
  //         "Pet name can only contain letters, spaces and hyphens"
  //       );
  //     }
  //     // Check if the pet with the same name has a different ID
  //     if (existingPet && existingPet._id.toString() !== req.params.id) {
  //       throw new Error("Pet name already exists");
  //     }
  //     return true;
  //   }),
  // body("description")
  //   .notEmpty()
  //   .withMessage("Pet description cannot be empty")
  //   .trim()
  //   .isLength({ max: 250 })
  //   .withMessage("Pet description must be less than 250 characters"),
];

module.exports = {
  validateCreatePet,
  validateUpdatePet,
};
