import React, { useEffect, useState } from "react";
import axios from "axios";
import GetComments from "./GetComments";
import url from "../../../general/url";
const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");

const CreateComment = ({ post, setNbComment }) => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");

  function getData() {
    axios
      .get(url.comment)
      .then((res) => setData(res.data.comments))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);

  function commentPost(e) {
    e.preventDefault();

    axios
      .post(url.comment + "/" + post.post_id, {
        uid: uid,
        pseudo: pseudo,
        commentaire: comment,
        date: Date.now(),
      })
      .then(() => {
        getData();
        setComment("");
      })
      .catch((error) => console.log(error));

    axios
      .put(url.postComment + post.post_id, {
        nbComments: 1,
      })
      .then((objet) => {
        setNbComment(objet.data.nbCommentaires);
        console.log(objet);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div id="getComment-container">
        {data
          .sort((a, b) => b.date - a.date)
          .map((comment) => (
            <GetComments
              comment={comment}
              post={post}
              setNbComment={setNbComment}
              key={comment.comment_id}
            />
          ))}
      </div>
      <div className="comment-post">
        <form onSubmit={commentPost} method="post">
          <textarea
            type="text"
            name="comment"
            id="comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
            placeholder="Ecrire un commentaire..."
            className="post"
          />
          <div>
            <input type="submit" value="Commenter" className="submitPost" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
