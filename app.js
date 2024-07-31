const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // Limits the number of requests from a single IP to prevent abuse and brute force attacks
const helmet = require("helmet"); // Helps secure Express apps by setting various HTTP headers
const xss = require("xss-clean"); // Sanitizes user input to prevent cross-site scripting (XSS) attacks
const mongoSanitize = require("express-mongo-sanitize"); // Prevents NoSQL injection attacks by sanitizing user input
const hpp = require("hpp"); // Mitigates HTTP Parameter Pollution (HPP) attacks by sanitizing and filtering query parameters
const { handleErrors } = require("./middlewares/error/errorHandler");
const dotenv = require("dotenv");
const configurePassport = require("./config/passportConfig");
const connectToMongoDB = require("./config/mongooseConfig");
const routes = require("./routes/index");
const i18next = require("./config/i18nConfig");
const i18nextMiddleware = require("i18next-express-middleware");
//const i18nextMiddleware = require("i18next-http-middleware"); // Import i18next middleware
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swaggerConfig");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  // Load environment variables from the .env file in development mode
  dotenv.config();
}

const app = express();

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 500, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Security middleware
//app.use(limiter); // Apply the rate limiting middleware to all requests
app.use(helmet()); // Adds security-related HTTP headers
app.use(xss()); // Protects against XSS attacks by sanitizing user inputs
app.use(mongoSanitize()); // Protects against NoSQL injection by sanitizing user inputs
app.use(hpp()); // Protects against HTTP Parameter Pollution attacks

// Middleware
app.use(
  cors({
    origin: "*", // Allow requests from any origin (Change for a specific origin in PROD)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified HTTP methods
    credentials: true, // Enable credentials for cross-origin requests (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204, // Respond to preflight requests with 204 status code
  })
);
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from incoming requests

// Initialize Passport.js for authentication
app.use(configurePassport().initialize());

// Note: No need for session middleware since we are using JWTs for authentication

// i18next middleware for handling translations
app.use(i18nextMiddleware.handle(i18next)); // Add i18next middleware

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", routes); // Mount API routes

// Connect to MongoDB
connectToMongoDB();

// Global error handling middleware for both known errors with custom messages and unexpected errors
app.use(handleErrors);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
