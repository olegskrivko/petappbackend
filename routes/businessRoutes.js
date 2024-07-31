const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");
const authenticateJWT = require("../middlewares/authentication/auth");

const multer = require("multer");
// const cloudinary = require("../config/cloudinaryConfig");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Business Routes
router.post(
  "/:userId/businesses",
  authenticateJWT,
  upload.single("image"),
  businessController.createBusiness
);
router.put(
  "/:userId/businesses/:businessId",
  authenticateJWT,
  businessController.updateBusiness
);
router.delete(
  "/:userId/businesses/:businessId",
  authenticateJWT,
  businessController.deleteBusiness
);
router.get(
  "/:businessId",
  // authenticateJWT,
  businessController.getBusinessById
);

// New route for fetching businesses by service ID
router.get("/services/:serviceId", businessController.getBusinessesByServiceId);

module.exports = router;
