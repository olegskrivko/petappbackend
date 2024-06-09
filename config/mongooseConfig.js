const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    const dbURL = process.env.DB_URL;
    await mongoose.connect(dbURL, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(`MongoDB connection error: ${error}`);
  }
}

module.exports = connectToMongoDB;
