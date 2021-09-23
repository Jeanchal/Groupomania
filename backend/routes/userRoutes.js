const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const auth = require("../middlewares/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/signup/:id", auth, userController.modifyUser);
router.get("/:id", auth, userController.getOneUser);
router.delete("/signup/:id", auth, userController.deleteUser);

module.exports = router;
