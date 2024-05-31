// middlewares/validation/validation.js
const { body, validationResult } = require("express-validator");
const { validateCreatePet, validateUpdatePet } = require("./petValidation");
const { validateCreateUser, validateUpdateUser } = require("./userValidation");

// Generic validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  validateRequest,
  validateCreatePet,
  validateUpdatePet,
  validateCreateUser,
  validateUpdateUser,
};
