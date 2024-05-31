const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {
  handleKnownErrors,
  handleUnexpectedErrors,
} = require("./middlewares/error/errorHandler");
const dotenv = require("dotenv");
const routes = require("./routes/index");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Middleware
const corsOptions = {
  origin: "*", // origin: "http://localhost:3000" or '*' to allow any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // enable credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204, // respond to preflight requests with 204 status
};

// Enable CORS with options
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Add this line to use cookieParser middleware

// Routes
app.use("/api", routes);

// Connect to MongoDB
const dbURL = process.env.DB_URL;
mongoose
  .connect(dbURL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    throw new Error(`MongoDB connection error: ${error}`);
  });

// Use the custom error handler for known errors
app.use(handleKnownErrors);

// Global error handling middleware for unexpected errors
app.use(handleUnexpectedErrors);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
