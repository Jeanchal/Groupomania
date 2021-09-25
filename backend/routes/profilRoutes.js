const express = require("express");
const router = express.Router();
const profilController = require("../controllers/profilController");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.post("/", profilController.postProfil);
router.put("/:userId", profilController.modifyProfil);
router.get("/", profilController.getAllProfils);
router.get("/:userId", profilController.getOneProfil);
router.delete("/:userId", profilController.deleteProfil);

module.exports = router;
