// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const router = express.Router();

// // Register route
// router.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const user = new User({ username, email, password });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Login route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const payload = { id: user.id, username: user.username };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  deleteAccount,
} = require("../controllers/authController");
const authenticateJWT = require("../middlewares/authentication/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser);
router.delete("/delete", authenticateJWT, deleteAccount);

module.exports = router;
