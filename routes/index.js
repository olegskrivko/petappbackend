// routes/index.js
const express = require("express");
const router = express.Router();
const petRoutes = require("./petRoutes");
const optionRoutes = require("./optionRoutes");
const translationRoutes = require("./translationRoutes");
const articleRoutes = require("./articleRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const shelterRoutes = require("./shelterRoutes");
const utilityRoutes = require("./utilityRoutes");
const categoryRoutes = require("./categoryRoutes");
const serviceRoutes = require("./serviceRoutes");
const serviceCategoryRoutes = require("./serviceCategoryRoutes");
const businessRoutes = require("./businessRoutes");
const infrastructureRoutes = require("./infrastructureRoutes");
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

router.use("/utilities", utilityRoutes);
router.use("/translations", translationRoutes);
router.use("/options", optionRoutes);
router.use("/pets", petRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/articles", articleRoutes);
router.use("/shelters", shelterRoutes);
router.use("/categories", categoryRoutes);
router.use("/infrastructures", infrastructureRoutes);
router.use("/businesses", businessRoutes);
router.use("/services", serviceRoutes);
router.use("/service-categories", serviceCategoryRoutes);
// Routes
// router.use("/api-docs", swaggerUiApp); // Mount Swagger UI

module.exports = router;
