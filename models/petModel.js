// models/petModel.js
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

const markingColorSchema = new mongoose.Schema({
  hex: {
    type: String,
  },
  label: {
    type: String,

    maxlength: 50,
    trim: true,
  },
});

const locationHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
});

const petSchema = new mongoose.Schema(
  {
    initialStatus: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    identifier: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    size: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    gender: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    behavior: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    age: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    breed: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    health: [
      {
        type: String,
        trim: true,
        maxlength: 50,
      },
    ],
    healthDetails: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    locationHistory: [locationHistorySchema],
    // location: {
    //   type: {
    //     type: String,
    //     enum: ["Point"],
    //     default: "Point",
    //   },
    //   coordinates: {
    //     type: [Number],
    //     index: "2dsphere", // Create a geospatial index
    //   },
    // },
    location: {
      type: locationSchema,
      required: true,
    },

    mainColor: {
      hex: { type: String },
      label: { type: String },
    },
    markingPattern: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    markingColors: [markingColorSchema], // Array of objects containing hex and label
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    mainImage: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
    },
    phoneCode: {
      type: String,
    },
    email: {
      type: String,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    updatedStatus: {
      type: String,
      trim: true,
      maxlength: 50,
      // required: true,
    },
    updatedStatusDescription: {
      type: String,
      trim: true,
      maxlength: 250,
      // required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    relatedPost: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    possibleMatches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;

// const commentSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: true,
//     maxlength: 250,
//   },
//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   location: {
//     type: locationSchema,
//     required: true,
//   },
// });
