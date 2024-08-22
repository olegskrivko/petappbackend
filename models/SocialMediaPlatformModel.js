// models/SocialMediaPlatform.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for predefined social media platforms
const SocialMediaPlatformSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    iconUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SocialMediaPlatform",
  SocialMediaPlatformSchema
);
