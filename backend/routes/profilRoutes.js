const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.post("/", auth, multer, profilController.postProfil);
router.put("/modify", auth, profilController.modifyProfil);
router.get("/", auth, profilController.getAllProfils);
router.get("/selectOne", auth, profilController.getOneProfil);
router.delete("/", auth, profilController.deleteProfil);

module.exports = router;
