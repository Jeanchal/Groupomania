import React, { useEffect, useState } from "react";
import axios from "axios";
import GetComments from "./GetComments";
const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");
const post_id = 123456;

const CommentPosts = () => {
  const url = "http://localhost:4000/api/post/comment/";
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(url + uid)
      .then((res) => {
        console.log(res.data.comment);
        setData(res.data.comment);
      })
      .catch((error) => console.log(error));
  }, []);

  function commentPost(e) {
    e.preventDefault();
    axios
      .post(url, {
        uid: uid,
        pseudo: pseudo,
        post_id: post_id,
        commentaire: comment,
        date: Date.now(),
      })
      .then(() => (window.location = "/acceuil"))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div id="getComment-container">
        {data
          .sort((a, b) => b.date - a.date)
          .map((comment) => (
            <GetComments comment={comment} key={comment.comment_id} />
          ))}
      </div>
      <form onSubmit={commentPost} method="post">
        <textarea
          type="text"
          name="comment"
          id="comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Ecrire un commentaire..."
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
