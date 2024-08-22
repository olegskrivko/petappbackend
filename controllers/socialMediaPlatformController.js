// controllers/socialMediaPlatformController.js

const SocialMediaPlatform = require("../models/SocialMediaPlatformModel");

// Get all social media platforms
exports.getAllSocialMediaPlatforms = async (req, res) => {
  try {
    const platforms = await SocialMediaPlatform.find();
    res.status(200).json(platforms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single social media platform by ID
exports.getSocialMediaPlatformById = async (req, res) => {
  try {
    const platform = await SocialMediaPlatform.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({ message: "Platform not found" });
    }
    res.status(200).json(platform);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new social media platform
exports.createSocialMediaPlatform = async (req, res) => {
  const { name, iconUrl } = req.body;

  try {
    const newPlatform = new SocialMediaPlatform({ name, iconUrl });
    await newPlatform.save();
    res.status(201).json(newPlatform);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing social media platform
exports.updateSocialMediaPlatform = async (req, res) => {
  const { name, iconUrl } = req.body;

  try {
    const platform = await SocialMediaPlatform.findByIdAndUpdate(
      req.params.id,
      { name, iconUrl },
      { new: true }
    );
    if (!platform) {
      return res.status(404).json({ message: "Platform not found" });
    }
    res.status(200).json(platform);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a social media platform
exports.deleteSocialMediaPlatform = async (req, res) => {
  try {
    const platform = await SocialMediaPlatform.findByIdAndDelete(req.params.id);
    if (!platform) {
      return res.status(404).json({ message: "Platform not found" });
    }
    res.status(200).json({ message: "Platform deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
