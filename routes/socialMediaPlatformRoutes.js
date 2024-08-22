// routes/socialMediaPlatformRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllSocialMediaPlatforms,
  getSocialMediaPlatformById,
  createSocialMediaPlatform,
  updateSocialMediaPlatform,
  deleteSocialMediaPlatform,
} = require("../controllers/socialMediaPlatformController");

// Get all social media platforms
router.get("/", getAllSocialMediaPlatforms);

// Get a single social media platform by ID
router.get("/:id", getSocialMediaPlatformById);

// Create a new social media platform
router.post("/", createSocialMediaPlatform);

// Update an existing social media platform
router.put("/:id", updateSocialMediaPlatform);

// Delete a social media platform
router.delete("/:id", deleteSocialMediaPlatform);

module.exports = router;
