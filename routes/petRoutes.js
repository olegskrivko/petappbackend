// routes/petRoutes.js
const express = require("express");
const router = express.Router();
const {
  validateRequest,
  validateCreatePet,
  validateUpdatePet,
} = require("../middlewares/validation/validation");
const petController = require("../controllers/petController");
const authenticateJWT = require("../middlewares/authentication/auth");
const commentRoutes = require("./commentRoutes"); // Add this line
// const fileUpload = require("../middlewares/fileUpload");

// Get all pets
router.get("/", petController.getPets);

// Get pet id
router.get("/:id", petController.getPetById);

// Create a new pet
router.post(
  "/",
  authenticateJWT,
  // fileUpload.single("image"),
  validateCreatePet,
  validateRequest,
  petController.createPet
);

// Update an existing pet
router.put("/:id", validateUpdatePet, validateRequest, petController.updatePet);

// Delete a pet
router.delete("/:id", petController.deletePet);

// Add this line after all the other routes
router.use("/:id/comments", commentRoutes);

module.exports = router;
