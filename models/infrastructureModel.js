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
  },
});

const InfrastructureSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: { type: String },
  name: { type: String, required: true },
  address: { type: String },
  location: {
    type: locationSchema,
    required: true,
  },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  workingHours: {
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String },
    saturday: { type: String },
    sunday: { type: String },
  },
});

module.exports = mongoose.model("Infrastructure", InfrastructureSchema);
