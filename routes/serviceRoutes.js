const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Define routes
router.post("/", serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:slug", serviceController.getServiceBySlug);
router.put("/:slug", serviceController.updateServiceBySlug);
router.delete("/:slug", serviceController.deleteServiceBySlug);

module.exports = router;
