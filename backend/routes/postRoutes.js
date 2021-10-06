const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

router.post("/", upload, postController.createPost);
router.put("/:post_id", upload, postController.modifyPost);
router.delete("/:post_id", postController.deletePost);
router.get("/", postController.getAllPosts);
router.get("/:post_id", postController.getOnePost);

router.put("/comment/:post_id", postController.commentPost);
router.put("/like/:post_id", postController.likePost);

module.exports = router;
