const express = require("express");
const router = express.Router();
const {
  validateRequest,
  //   validateCreateUtility,
  //   validateUpdateUtility,
} = require("../middlewares/validation/validation");
const authenticateJWT = require("../middlewares/authentication/auth");
const utilityController = require("../controllers/utilityController");

// Feedback route
router.post("/send-feedback", utilityController.sendFeedback);

module.exports = router;
