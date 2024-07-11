const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authentication/auth");

// PUT request to update user fields
router.put("/:userId", authenticateJWT, userController.updateUserFields);

router.get("/:userId/favorites", authenticateJWT, userController.favoritedPets);

router.get("/:userId/ownedPets", authenticateJWT, userController.ownedPets);

router.put(
  "/:userId/favorites/:petId/add",

  userController.addFavorite
);
router.put(
  "/:userId/favorites/:petId/remove",

  userController.removeFavorite
);

module.exports = router;
