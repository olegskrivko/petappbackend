const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authentication/auth");
router.put(
  "/users/:userId/favorites/:petId/add",

  userController.addFavorite
);
router.put(
  "/users/:userId/favorites/:petId/remove",

  userController.removeFavorite
);

module.exports = router;
