const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/:uid", userController.modifyUser);
router.delete("/:uid", userController.deleteUser);
router.get("/", userController.getAllUsers);
router.get("/:uid", userController.getOneUser);

module.exports = router;
