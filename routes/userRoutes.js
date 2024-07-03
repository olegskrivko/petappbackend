const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authentication/auth");

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
