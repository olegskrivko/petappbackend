// commentRoutes.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const commentController = require("../controllers/commentController");
const authenticateJWT = require("../middlewares/authentication/auth");

const multer = require("multer");
// const cloudinary = require("../config/cloudinaryConfig");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Post a new comment
router.post(
  "/",
  authenticateJWT,
  upload.single("image"),
  commentController.createComment
);

// Get all comments for a pet
router.get("/", commentController.getComments);

// Get a specific comment for a pet
router.get("/:commentId", commentController.getCommentById);

// Update a comment
router.put("/:commentId", authenticateJWT, commentController.updateComment);

// Delete a comment
router.delete("/:commentId", authenticateJWT, commentController.deleteComment);

module.exports = router;
