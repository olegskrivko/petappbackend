// middlewares/validation/userValidation.js
const { body } = require("express-validator");
const User = require("../../models/userModel");

const validateCreateUser = [];

const validateUpdateUser = [];

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
