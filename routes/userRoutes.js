const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const businessController = require("../controllers/businessController");
const authenticateJWT = require("../middlewares/authentication/auth");

// PUT request to update user fields
router.put("/:userId", authenticateJWT, userController.updateUserFields);

router.get("/:userId/favorites", authenticateJWT, userController.favoritedPets);

router.get("/:userId/ownedPets", authenticateJWT, userController.ownedPets);

router.delete(
  "/:userId/ownedPets/:petId",
  authenticateJWT,
  userController.deleteOwnedPets
);

router.put(
  "/:userId/favorites/:petId/add",

  userController.addFavorite
);
router.put(
  "/:userId/favorites/:petId/remove",

  userController.removeFavorite
);

module.exports = router;

// Business Routes
// Get all businesses owned by a user
// router.get(
//   "/:userId/businesses",
//   authenticateJWT,
//   userController.getBusinessesByUserId
// );

// Create a new business (typically, you might not want to allow arbitrary creation without proper authentication)
// router.post(
//   "/:userId/businesses",
//   authenticateJWT,
//   businessController.createBusiness
// );

// // Update an existing business
// router.put(
//   "/:userId/businesses/:businessId",
//   authenticateJWT,
//   businessController.updateBusiness
// );

// // Delete a business
// router.delete(
//   "/:userId/businesses/:businessId",
//   authenticateJWT,
//   businessController.deleteBusiness
// );

// // Get details of a specific business
// router.get(
//   "/:userId/businesses/:businessId",
//   authenticateJWT,
//   businessController.getBusinessById
// );
