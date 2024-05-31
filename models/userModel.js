// // models/userModel.js
// const mongoose = require("mongoose");

// // const mealPlanSchema = new mongoose.Schema({
// //   day: { type: String, required: true }, // "Monday", "Tuesday", etc.
// //   meals: [
// //     {
// //       time: { type: String, required: true }, // "Breakfast", "Lunch", "Dinner", etc.
// //       recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }], // References to recipes
// //     },
// //   ],
// // });

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },

//   address: String,
//   phoneNumber: String,
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
//   petsOwned: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Pet",
//     },
//   ],
//   dateJoined: {
//     type: Date,
//     default: Date.now,
//   },

//   firstName: { type: String },
//   lastName: { type: String },
//   password: { type: String, required: true },
//   role: { type: String, default: "user" }, // admin, user, etc.

//   // level: {
//   //   type: Number,
//   //   default: 1,
//   // },

//   profilePicture: { type: String }, // URL or image upload
//   bio: { type: String },
//   favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
//   dietaryPreferences: [{ type: String }], // Array of dietary preferences
//   //recipesLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
//   //recipesShared: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
//   //numberOfFollowers: { type: Number, default: 0 },
//   //numberOfFollowing: { type: Number, default: 0 },
//   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
//   facebookProfile: { type: String },
//   //twitterHandle: { type: String },
//   instagramProfile: { type: String },
//   notificationPreferences: { type: String }, // Can be further detailed based on your needs
//   emailPreferences: { type: String }, // Can be further detailed based on your needs
//   twoFactorAuthentication: { type: Boolean, default: false },
//   country: { type: String },
//   city: { type: String },
//   dateOfRegistration: { type: Date, default: Date.now },
//   lastLogin: { type: Date },
//   accountStatus: { type: String, default: "active" }, // active, suspended, etc.
//   passwordResetToken: { type: String },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");

// Define schema for basic information
const basicInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
  },
});

// Define schema for profile information
const profileSchema = new mongoose.Schema({
  profilePicture: String,
  description: String,
  website: String,
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
  },
  businessLicenseNumber: String,
});

// Define schema for service information
const serviceSchema = new mongoose.Schema({
  typeOfService: String,
  serviceArea: String,
  availability: String,
  pricing: String,
});

// Define schema for company information
const companySchema = new mongoose.Schema({
  companyName: String,
  businessType: String,
  industry: String,
  businessHours: String,
  contactPerson: String,
  taxId: String,
});

// Define schema for additional information
const additionalInfoSchema = new mongoose.Schema({
  preferences: {
    language: String,
    communicationMethods: [String],
  },
  termsOfServiceAgreement: {
    type: Boolean,
    required: true,
  },
  privacyPolicyAgreement: {
    type: Boolean,
    required: true,
  },
});

// Define schema for security measures
const securitySchema = new mongoose.Schema({
  captcha: Boolean,
  twoFactorAuthentication: Boolean,
});

// Define schema for verification process
const verificationSchema = new mongoose.Schema({
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
});

// Combine all schemas into a single schema
const userSchema = new mongoose.Schema({
  basicInfo: basicInfoSchema,
  profileInfo: profileSchema,
  serviceInfo: serviceSchema,
  companyInfo: companySchema,
  additionalInfo: additionalInfoSchema,
  securityMeasures: securitySchema,
  verificationProcess: verificationSchema,
});

// Create and export the Mongoose model
module.exports = mongoose.model("User", userSchema);
