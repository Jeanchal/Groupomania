const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");

router.post("/:post_id", auth, commentController.createComment);
router.put("/:comment_id", auth, commentController.modifyComment);
router.delete("/:comment_id", auth, commentController.deleteComment);
router.get("/", auth, commentController.getAllComments);
router.get("/:comment_id", auth, commentController.getOneComment);

module.exports = router;
