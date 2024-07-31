// PATH: /routes/categoryRoutes.js
// BASE URL: /api/service-categories/
const express = require("express");
const router = express.Router();
// const {
//   validateRequest,
//   validateServiceCreateCategory,
//   validateServiceUpdateCategory,
// } = require("../middlewares/validation/validation");
const authenticateJWT = require("../middlewares/authentication/auth");
const serviceCategoryController = require("../controllers/serviceCategoryController");

// Create a new service category
router.post("/", serviceCategoryController.createServiceCategory);

// Get all service categories
router.get("/", serviceCategoryController.getAllServiceCategories);

// Get a service category by slug
router.get("/:slug", serviceCategoryController.getServiceCategoryBySlug);

// Update a service category
router.put("/:slug", serviceCategoryController.updateServiceCategory);

// Delete a service category
router.delete("/:slug", serviceCategoryController.deleteServiceCategory);

module.exports = router;
