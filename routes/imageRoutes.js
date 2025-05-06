const express = require("express");
const multer = require("multer");
const router = express.Router();
const imageController = require("../controllers/imageController");

const upload = multer({ dest: "uploads/" }); // store temporarily

router.post("/upload", upload.single("image"), imageController.uploadImage);
router.get("/:category", imageController.getImagesByCategory);

module.exports = router;
