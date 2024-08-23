// PATH: /routes/articleRoutes.js
// BASE URL: /api/articles

const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  validateRequest,
  //   validateCreateArticle,
  //   validateUpdateArticle,
} = require("../middlewares/validation/validation");
const authenticateJWT = require("../middlewares/authentication/auth");
const articleController = require("../controllers/articleController");

// Configure multer to handle multiple files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all articles
router.get("/", articleController.getAllArticles);

// Create a new article
router.post(
  "/",
  upload.any(), // Use `any()` to handle dynamic fields
  (req, res, next) => {
    // Process `req.files` to match your `sections` logic
    // Handle file storage or processing here
    next();
  }, // Adjust field name and max count as needed
  //   validateCreateArticle,
  validateRequest,
  articleController.createArticle
);

// Get article by id
router.get("/:id", articleController.getArticleById);

// Update an existing article
router.put(
  "/:id",
  //   validateUpdateArticle,
  validateRequest,
  articleController.updateArticle
);

// Delete a article
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
