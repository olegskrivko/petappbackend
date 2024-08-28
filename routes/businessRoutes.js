// const express = require("express");
// const router = express.Router();
// const businessController = require("../controllers/businessController");
// const authenticateJWT = require("../middlewares/authentication/auth");

// const multer = require("multer");
// // const cloudinary = require("../config/cloudinaryConfig");

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Business Routes
// router.post(
//   "/:userId/businesses",
//   authenticateJWT,
//   upload.single("image"),
//   businessController.createBusiness
// );
// router.put(
//   "/:userId/businesses/:businessId",
//   authenticateJWT,
//   businessController.updateBusiness
// );
// router.delete(
//   "/:userId/businesses/:businessId",
//   authenticateJWT,
//   businessController.deleteBusiness
// );
// router.get(
//   "/:businessId",
//   // authenticateJWT,
//   businessController.getBusinessById
// );

// // New route for fetching businesses by service ID
// router.get("/services/:serviceId", businessController.getBusinessesByServiceId);

// module.exports = router;

const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");
const authenticateJWT = require("../middlewares/authentication/auth");

const multer = require("multer");
// const cloudinary = require("../config/cloudinaryConfig");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Business Routes

// Route to create a new business
router.post(
  "/",
  authenticateJWT,
  upload.single("image"),
  businessController.createBusiness
);

// Route to get a single business by ID
router.get("/:id", businessController.getBusinessById);

// Route to get all businesses (optionally with query parameters)
router.get("/", businessController.getAllBusinesses);

// Route to get businesses by service ID
router.get("/service/:serviceId", businessController.getBusinessesByServiceId);

// Route to update a business by ID
router.put("/:id", businessController.updateBusiness);

// Route to delete a business by ID
router.delete("/:id", businessController.deleteBusiness);

module.exports = router;
