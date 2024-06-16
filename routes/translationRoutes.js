// const express = require("express");
// const router = express.Router();
// const translationController = require("../controllers/translationController");

// // GET route to fetch translations for a specific language
// router.get("/:lang", translationController.getTranslation);

// module.exports = router;

// SENDING HEADERS WITH LANGUAGE CODE

const express = require("express");
const router = express.Router();
const translationController = require("../controllers/translationController");

// GET route to fetch translations
router.get("/", translationController.getTranslation);

module.exports = router;
