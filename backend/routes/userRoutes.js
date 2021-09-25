const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/modify", auth, userController.modifyUser);
router.delete("/delete", auth, userController.deleteUser);
router.get("/select", userController.getAllUsers);
router.get("/selectOne", userController.getOneUser);

module.exports = router;
