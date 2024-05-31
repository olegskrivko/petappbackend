// routes/petRoutes.js
const express = require("express");
const router = express.Router();
const {
  validateRequest,
  validateCreatePet,
  validateUpdatePet,
} = require("../middlewares/validation/validation");
const petController = require("../controllers/petController");

// Get all pets
router.get("/", petController.getPets);

// Get pet id
router.get("/:id", petController.getPetById);

// Create a new pet
router.post("/", validateCreatePet, validateRequest, petController.createPet);

// Update an existing pet
router.put("/:id", validateUpdatePet, validateRequest, petController.updatePet);

// Delete a pet
router.delete("/:id", petController.deletePet);

module.exports = router;
