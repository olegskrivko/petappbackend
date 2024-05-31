// routes/index.js
const express = require("express");
const router = express.Router();
const petRoutes = require("./petRoutes");
const userRoutes = require("./userRoutes");

const {
  authenticateToken,
  isAuthenticated,
  isPetOwner,
} = require("../middlewares/authentication/authMiddleware");

// routes
// router.use("/recipes", authenticateToken, isAuthenticated, recipeRoutes);
// router.use("/how-to", howToRoutes);
router.use("/pets", petRoutes);
router.use("/users", userRoutes);

module.exports = router;
