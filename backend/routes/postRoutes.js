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
router.put("/:uid", postController.modifyPost);
router.put("/:uid", postController.commentPost);
router.put("/:uid", postController.likePost);
router.delete(":uid", postController.deletePost);
router.get("/", postController.getAllPosts);
router.get("/:uid", postController.getOnePost);

//--------Commentaires Routes
router.post("/comment", commentController.createComment);
router.put("/comment/:uid", commentController.modifyComment);
router.delete("/comment/:uid", commentController.deleteComment);
router.get("/comment", commentController.getAllComments);
router.get("/comment/:uid", commentController.getOneComment);

module.exports = router;
