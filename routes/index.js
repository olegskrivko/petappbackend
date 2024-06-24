// routes/index.js
const express = require("express");
const router = express.Router();
const petRoutes = require("./petRoutes");
const optionRoutes = require("./optionRoutes");
const translationRoutes = require("./translationRoutes");

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const authenticateJWT = require("../middlewares/authentication/auth");
// const swaggerUiApp = require("./swagger");
// const {
//   authenticateToken,
//   isAuthenticated,
//   isPetOwner,
// } = require("../middlewares/authentication/authMiddleware");

// routes
// router.use("/recipes", authenticateToken, isAuthenticated, recipeRoutes);
// router.use("/how-to", howToRoutes);
// router.use("/users", authenticateJWT, userRoutes);
router.use("/translations", translationRoutes);
router.use("/options", optionRoutes);
router.use("/pets", petRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
// Routes
// router.use("/api-docs", swaggerUiApp); // Mount Swagger UI

module.exports = router;
