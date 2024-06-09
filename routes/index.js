// routes/index.js
const express = require("express");
const router = express.Router();
const petRoutes = require("./petRoutes");
// const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const authenticateJWT = require("../middlewares/authentication/auth");
// const {
//   authenticateToken,
//   isAuthenticated,
//   isPetOwner,
// } = require("../middlewares/authentication/authMiddleware");

// routes
// router.use("/recipes", authenticateToken, isAuthenticated, recipeRoutes);
// router.use("/how-to", howToRoutes);
// router.use("/users", authenticateJWT, userRoutes);
router.use("/pets", petRoutes);
router.use("/auth", authRoutes);

module.exports = router;
