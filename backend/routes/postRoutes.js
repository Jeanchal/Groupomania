const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.post("/", multer, postController.createPost);
router.put("/:userId", postController.modifyPost);
router.delete(":userId", postController.deletePost);
router.get("/", postController.getAllPosts);
router.get("/:userId", postController.getOnePost);

module.exports = router;
