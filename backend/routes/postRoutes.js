const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const uploadController = require("../controllers/uploadController");
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

router.post("/", postController.createPost);
router.post("/upload", upload, uploadController.uploadPost);
router.put("/:post_id", postController.modifyPost);
router.delete("/:post_id", postController.deletePost);
router.get("/", postController.getAllPosts);
router.get("/:post_id", postController.getOnePost);

router.put("/:post_id", postController.commentPost);
router.put("/:post_id", postController.likePost);

module.exports = router;
