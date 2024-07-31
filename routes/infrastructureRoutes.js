const express = require("express");
const router = express.Router();
const infrastructureController = require("../controllers/infrastructureController");

// Define routes
router.post("/", infrastructureController.createInfrastructure);
router.get("/", infrastructureController.getAllInfrastructures);
router.get("/:id", infrastructureController.getInfrastructureById);
router.put("/:id", infrastructureController.updateInfrastructureById);
router.delete("/:id", infrastructureController.deleteInfrastructureById);

module.exports = router;
