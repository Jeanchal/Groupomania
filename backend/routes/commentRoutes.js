const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");

router.post("/:post_id", commentController.createComment);
router.put("/:comment_id", commentController.modifyComment);
router.delete("/:comment_id", commentController.deleteComment);
router.get("/", commentController.getAllComments);
router.get("/:comment_id", commentController.getOneComment);

// //
// router.get("/:uid", commentController.getCommentUid);

module.exports = router;
