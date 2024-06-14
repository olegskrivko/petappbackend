// PATH: /routes/optionRoutes.js
// BASE URL: /api/options

const express = require("express");
const router = express.Router();
const {
  validateRequest,
  //   validateCreateOption,
  //   validateUpdateOption,
} = require("../middlewares/validation/validation");
const authenticateJWT = require("../middlewares/authentication/auth");
const optionController = require("../controllers/optionController");

// Get all options
router.get("/", optionController.getAllOptions);

// Create a new option
router.post(
  "/",
  //   validateCreateOption,
  validateRequest,
  optionController.createOption
);

// Get option by id
router.get("/:slug", optionController.getOptionById);

// Update an existing option
router.put(
  "/:id",
  //   validateUpdateOption,
  validateRequest,
  optionController.updateOption
);

// Delete a option
router.delete("/:id", optionController.deleteOption);

module.exports = router;
