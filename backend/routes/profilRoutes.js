const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const uploadController = require("../controllers/uploadController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

router.post("/", profilController.postProfil);
router.post("/upload", upload, uploadController.uploadProfil);
router.put("/:userId", profilController.modifyProfil);
router.get("/", profilController.getAllProfils);
router.get("/:userId", profilController.getOneProfil);
router.delete("/:userId", profilController.deleteProfil);

module.exports = router;
