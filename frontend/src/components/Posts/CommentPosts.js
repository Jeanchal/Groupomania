import React, { useState } from "react";
import axios from "axios";
const userId = sessionStorage.getItem("userId");
// const pseudo = sessionStorage.getItem("pseudo");

const CommentPosts = () => {
  const url = "http://localhost:4000/api/post/commentaire";
  const [comment, setComment] = useState("");

  function savePost(e) {
    e.preventDefault();
    axios
      .post(url, {
        userId: userId,
        commentaire: comment,
      })
      .then(() => (window.location = "/acceuil"))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <form onSubmit={savePost} method="post">
        <textarea
          type="text"
          name="comment"
          id="comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="commentaires..."
          className="post"
        />
        <div>
          <input type="submit" value="Commenter" className="submitPost" />
        </div>
      </form>
    </div>
  );
};

export default CommentPosts;
