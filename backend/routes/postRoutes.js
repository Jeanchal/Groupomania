const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const uploadController = require("../controllers/uploadController");
const auth = require("../middlewares/auth");
const multer = require("multer");
const upload = multer().single("file");

router.post("/", postController.createPost);
router.post("/upload", upload, uploadController.uploadPost);
router.put("/:userId", postController.modifyPost);
router.delete(":userId", postController.deletePost);
router.get("/", postController.getAllPosts);
router.get("/:userId", postController.getOnePost);

module.exports = router;
