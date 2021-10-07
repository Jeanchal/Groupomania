const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

router.post("/", auth, upload, postController.createPost);
router.put("/:post_id", auth, upload, postController.modifyPost);
router.delete("/:post_id", auth, postController.deletePost);
router.get("/", auth, postController.getAllPosts);
router.get("/:post_id", auth, postController.getOnePost);
router.put("/comment/:post_id", auth, postController.commentPost);
router.put("/like/:post_id", auth, postController.likePost);

module.exports = router;
