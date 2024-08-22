// PATH: /routes/shelterRoutes.js
// BASE URL: /api/shelters

const express = require("express");
const router = express.Router();
const {
  validateRequest,
  //   validateCreateShelter,
  //   validateUpdateShelter,
} = require("../middlewares/validation/validation");
const authenticateJWT = require("../middlewares/authentication/auth");
const shelterController = require("../controllers/shelterController");

// Get all shelters
router.get("/", shelterController.getAllShelters);

// Create a new shelter
router.post(
  "/",
  //   validateCreateShelter,
  validateRequest,
  shelterController.createShelter
);

// Get shelter by id
router.get("/:id", shelterController.getShelterById);

// Update an existing shelter
router.put(
  "/:id",
  //   validateUpdateShelter,
  validateRequest,
  shelterController.updateShelter
);

// Delete a shelter
router.delete("/:id", shelterController.deleteShelter);

module.exports = router;
