const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

router.post("/upload", auth, upload, profilController.uploadProfil);
router.put("/:uid", auth, profilController.modifyProfil);
router.get("/", auth, profilController.getAllProfils);
router.get("/:uid", auth, profilController.getOneProfil);

module.exports = router;
