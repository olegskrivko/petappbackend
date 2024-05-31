// routes/optionSetRoutes.js
const express = require("express");
const router = express.Router();
// const {
//   validateRequest,
//   validateCreatePet,
//   validateUpdatePet,
// } = require("../middlewares/validation/validation");
// const petController = require("../controllers/petController");

// Get all pets
// routes/optionSetRoutes.js

const optionSetController = require("../controllers/optionSetController");

// POST route to add new options
router.post("/", optionSetController.addOption);

module.exports = router;

module.exports = router;
