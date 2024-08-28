// const express = require("express");
// const router = express.Router();
// const serviceController = require("../controllers/serviceController");

// // Define routes
// router.post("/", serviceController.createService);
// router.get("/", serviceController.getAllServices);
// router.get("/:slug", serviceController.getServiceBySlug);
// router.put("/:slug", serviceController.updateServiceBySlug);
// router.delete("/:slug", serviceController.deleteServiceBySlug);

// module.exports = router;

const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const authenticateJWT = require("../middlewares/authentication/auth");

const multer = require("multer");
// const cloudinary = require("../config/cloudinaryConfig");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add a new service
router.post(
  "/",
  //   authenticateJWT,
  upload.single("image"),
  serviceController.addService
);

// Route to get all services
router.get("/", serviceController.getAllServices);

// Route to get a single service by ID
router.get("/:id", serviceController.getServiceById);

// Route to update a service by ID
router.put("/:id", serviceController.updateService);

// Route to delete a service by ID
router.delete("/:id", serviceController.deleteService);

module.exports = router;
