// PATH: /routes/articleRoutes.js
// BASE URL: /api/articles

const express = require("express");
const router = express.Router();
const {
  validateRequest,
  //   validateCreateArticle,
  //   validateUpdateArticle,
} = require("../middlewares/validation/validation");
const authenticateJWT = require("../middlewares/authentication/auth");
const articleController = require("../controllers/articleController");

// Get all articles
router.get("/", articleController.getAllArticles);

// Create a new article
router.post(
  "/",
  //   validateCreateArticle,
  validateRequest,
  articleController.createArticle
);

// Get article by id
router.get("/:slug", articleController.getArticleBySlug);

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
