import React, { useState } from "react";
import axios from "axios";

const dateParser = (date) => {
  let newDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return newDate;
};

const GetComments = ({ comment, post }) => {
  const url = "http://localhost:4000/api/comment/";
  const [commentModif, setCommentModif] = useState(false);
  const [commentSuppr, setCommentSuppr] = useState(false);
  const [textModif, setTextModif] = useState(comment.commentaire);

  function supprComment() {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment supprimer ce commentaire ?"
    );
    if (reponse === true) {
      axios
        .delete(url + comment.comment_id)
        .then(() => {
          setCommentSuppr(true);
          console.log("Commentaire supprimé !");
        })
        .catch((error) => console.log(error));
    }
  }
  function modifComment() {
    console.log(comment.comment_id);
    if (commentModif === false) {
      setCommentModif(true);
    } else {
      setCommentModif(false);
    }
  }
  function saveModifComment() {
    axios
      .put(url + comment.comment_id, {
        commentaire: textModif,
      })
      .then(() => setCommentModif(false))
      .catch((error) => console.log(error));
  }

  if (post.post_id === comment.post_id) {
    if (commentSuppr === false) {
      return (
        <div id="getComment-container">
          <div className="comment-container">
            <div className="comment-pseudo">{comment.pseudo}</div>
            <div>
              {commentModif ? (
                <div>
                  <input
                    type="text"
                    onChange={(e) => setTextModif(e.target.value)}
                    value={textModif}
                  />
                  <button onClick={saveModifComment}>modifier</button>
                </div>
              ) : (
                <div className="commentaire">{textModif}</div>
              )}
            </div>
            <div className="modif-comment">
              <p>posté le {dateParser(comment.createdAt)}</p>
              <div>
                <i className="fas fa-trash-alt" onClick={supprComment}></i>
                <i
                  className="fas fa-edit"
                  value={comment}
                  onClick={modifComment}
                ></i>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default GetComments;
