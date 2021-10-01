const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const uploadController = require("../controllers/uploadController");
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

//--------Posts Routes
router.post("/", postController.createPost);
router.post("/upload", upload, uploadController.uploadPost);
router.put("/:userId", postController.modifyPost);
router.delete(":userId", postController.deletePost);
router.get("/", postController.getAllPosts);
router.get("/:userId", postController.getOnePost);

//--------Commentaires Routes
router.post("/comment", commentController.createComment);
router.put("/comment/:userId", commentController.modifyComment);
router.delete("/comment/:userId", commentController.deleteComment);
router.get("/comment", commentController.getAllComments);
router.get("/comment/:userId", commentController.getOneComment);

module.exports = router;
