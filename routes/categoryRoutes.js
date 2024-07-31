// PATH: /routes/categoryRoutes.js
// BASE URL: /api/categories
const express = require("express");
const router = express.Router();
const {
  validateRequest,
  //   validateCreateCategory,
  //   validateUpdateCategory,
} = require("../middlewares/validation/validation");
const authenticateJWT = require("../middlewares/authentication/auth");
const categoryController = require("../controllers/categoryController");

// Create a new category
router.post("/", categoryController.createCategory);

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get a category by slug
router.get("/:slug", categoryController.getCategoryBySlug);

// Update a category
router.put("/:slug", categoryController.updateCategory);

// Delete a category
router.delete("/:slug", categoryController.deleteCategory);

module.exports = router;
