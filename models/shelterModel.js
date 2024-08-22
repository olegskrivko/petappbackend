const mongoose = require("mongoose");

// Schema for storing individual social media profiles
const SocialMediaProfileSchema = new mongoose.Schema({
  platform: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SocialMediaPlatform",
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere", // Create a geospatial index
    required: true,
  },
});

const addressDetailsSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
  },
});

const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  businessForm: {
    type: String,
  },
  registrationNumber: {
    type: Number,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
  },
  addressDetails: {
    type: addressDetailsSchema,
  },
  location: {
    type: locationSchema,
  },
  contact: {
    type: contactSchema,
  },
  socialMediaProfiles: [
    SocialMediaProfileSchema, // Embeds social media profiles directly in the user document
  ],
  photos: [String],
  tags: [String],
  totalAnimals: {
    type: Number,
    default: 0,
  },
  adoptedAnimals: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Shelter = mongoose.model("Shelter", shelterSchema);

module.exports = Shelter;
