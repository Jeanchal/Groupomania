const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

router.post("/upload", upload, profilController.uploadProfil);
router.put("/:uid", profilController.modifyProfil);
router.get("/", profilController.getAllProfils);
router.get("/:uid", profilController.getOneProfil);

// router.post("/", profilController.postProfil);
// router.delete("/:uid", profilController.deleteProfil);

module.exports = router;
