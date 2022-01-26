import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../../general/url";
import GetComments from "./GetComments";

const CreateComment = ({ post, setNbComment, auth }) => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  function getData() {
    axios
      .get(url.comment, config)
      .then((res) => setData(res.data.comments))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);

  function commentPost(e) {
    e.preventDefault();

    let objet = {
      uid: auth.uid,
      pseudo: auth.pseudo,
      commentaire: comment,
      date: Date.now(),
    };
    axios
      .post(url.comment + "/" + post.post_id, objet, config)
      .then(() => {
        getData();
        setComment("");
      })
      .catch((error) => console.log(error));

    axios
      .put(url.postComment + post.post_id, { nbComments: 1 }, config)
      .then((objet) => setNbComment(objet.data.nbCommentaires))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div id="getComment-container">
        {data
          .sort((a, b) => b.date - a.date)
          .map((comment) => (
            <GetComments
              auth={auth}
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
