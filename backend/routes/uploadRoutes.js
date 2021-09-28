const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.post("/", multer, (req, res) => {
  console.log(
    `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  );
  console.log("image enregistrée !");
});

module.exports = router;
