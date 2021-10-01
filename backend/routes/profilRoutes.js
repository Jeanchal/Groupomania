const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const uploadController = require("../controllers/uploadController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

router.post("/", profilController.postProfil);
router.post("/upload", upload, uploadController.uploadProfil);
router.put("/:uid", profilController.modifyProfil);
router.get("/", profilController.getAllProfils);
router.get("/:uid", profilController.getOneProfil);
router.delete("/:uid", profilController.deleteProfil);

module.exports = router;
