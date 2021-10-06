import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../../general/url";
import dateParser from "../../../general/dateParser";
const uid = sessionStorage.getItem("uid");

const GetComments = ({ comment, post }) => {
  const urlComment = url.comment + "/" + comment.comment_id;
  const [commentModif, setCommentModif] = useState(false);
  const [commentSuppr, setCommentSuppr] = useState(false);
  const [textModif, setTextModif] = useState(comment.commentaire);
  const [activModif, setActivModif] = useState(true);

  useEffect(() => {
    if (comment.uid === uid) {
      setActivModif(false);
    }
  }, []);

  function supprComment() {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment supprimer ce commentaire ?"
    );
    if (reponse === true) {
      axios
        .delete(urlComment)
        .then(() => setCommentSuppr(true))
        .catch((error) => console.log(error));

      axios
        .put(url.postComment + post.post_id, {
          nbComments: 0,
        })
        .then((objet) => {
          const nbCom = document.querySelector(".post-number");
          nbCom.innerText = objet.data.nbCommentaires;
        })
        .catch((error) => console.log(error));
    }
  }
  function modifComment() {
    if (commentModif === false) {
      setCommentModif(true);
    } else {
      setCommentModif(false);
    }
  }
  function saveModifComment() {
    axios
      .put(urlComment, {
        commentaire: textModif,
      })
      .then(() => setCommentModif(false))
      .catch((error) => console.log(error));
  }

  if (post.post_id === comment.post_id) {
    if (commentSuppr === false) {
      return (
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
            <div className={activModif ? "activ-img" : null}>
              <i
                className="fas fa-trash-alt"
                title="supprimer"
                onClick={supprComment}
              ></i>
              <i
                className="fas fa-edit"
                title="modifier"
                onClick={modifComment}
              ></i>
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
