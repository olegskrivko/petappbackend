// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  validateRequest,
  validateCreateUser,
  validateUpdateUser,
} = require("../middlewares/validation/validation");
const {
  authenticateToken,
} = require("../middlewares/authentication/authMiddleware");
const userController = require("../controllers/userController");

// Get all users
// router.get("/", userController.getUsers);

// Create a new user
// router.post(
//   "/",
//   validateCreateUser,
//   validateRequest,
//   userController.createUser
// );

router.post("/register", userController.register);
router.post("/login", userController.login);

// Update an existing user
// router.put(
//   "/:id",
//   validateUpdateUser,
//   validateRequest,
//   userController.updateUser
// );

// Delete a user
// router.delete("/:id", userController.deleteUser);

module.exports = router;
