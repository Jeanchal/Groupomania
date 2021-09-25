const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/:userId", userController.modifyUser);
router.delete(":userId", userController.deleteUser);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getOneUser);

module.exports = router;
