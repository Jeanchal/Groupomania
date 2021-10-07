const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/:uid", auth, userController.modifyUser);
router.post("/:uid", auth, userController.deleteUser);
router.get("/", auth, userController.getAllUsers);
router.get("/:uid", auth, userController.getOneUser);

module.exports = router;
