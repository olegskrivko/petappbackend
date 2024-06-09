// middlewares/validation/petValidation.js
const { body } = require("express-validator");
const Pet = require("../../models/petModel");

const validateCreatePet = [
  // body("initialStatus")
  //   .notEmpty()
  //   .withMessage("Pet initial status is required")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet initial status must be less than 50 characters")
  //   .escape(),
  // body("category")
  //   .notEmpty()
  //   .withMessage("Pet category is required")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet category must be less than 50 characters")
  //   .escape(),
  // body("identifier")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet identifier must be less than 50 characters")
  //   .escape(),
  // body("size")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet size must be less than 50 characters")
  //   .escape(),
  // body("gender")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet gender must be less than 50 characters"),
  // body("behavior")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet behavior must be less than 50 characters")
  //   .escape(),
  // body("age")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet age must be less than 50 characters")
  //   .escape(),
  // body("breed")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Pet breed must be less than 50 characters")
  //   .escape(),
  // body("health")
  //   .isArray()
  //   .withMessage("Pet health must be an array")
  //   .optional(),
  // body("health.*")
  //   .isLength({ max: 50 })
  //   .withMessage("Each health item must be less than 50 characters")
  //   .escape(),
  // body("healthDetails")
  //   .trim()
  //   .isLength({ max: 250 })
  //   .withMessage("Pet health details must be less than 250 characters")
  //   .escape()
  //   .optional(),
];

const validateUpdatePet = [];

module.exports = {
  validateCreatePet,
  validateUpdatePet,
};
