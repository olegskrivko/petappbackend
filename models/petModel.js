// models/petModel.js
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    petStatus: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    petCategory: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    petIdentifier: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    petSize: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    petGender: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    petBehavior: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    petAge: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    petBreed: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    petHealth: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    otherHealthIssues: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere", // Create a geospatial index
      },
    },
    markingPattern: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    mainColor: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    markingColors: {
      type: [String],
      trim: true,
    },
    petLostOrFoundDate: {
      type: String,
    },
    petLostOrFoundTime: {
      type: String,
    },
    petImage: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 250,
    },

    sightingHistory: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        location: {
          type: String,
          trim: true,
          maxlength: 250,
        },
      },
    ],
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
