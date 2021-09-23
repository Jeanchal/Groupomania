const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const auth = require("../middlewares/auth");

router.post("/", auth, userController.signup);

module.exports = router;
