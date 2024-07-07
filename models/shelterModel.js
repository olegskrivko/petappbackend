const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere", // Create a geospatial index
    // required: true,
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

const socialMediaSchema = new mongoose.Schema({
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String,
  youtube: String,
});

const shelterSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  author: String,
  url: String,
  coverPicture: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
  socialMedia: socialMediaSchema,
  services: [String],
  tags: [String],
});

const Shelter = mongoose.model("Shelter", shelterSchema);

module.exports = Shelter;
