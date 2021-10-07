import React, { useState } from "react";
import axios from "axios";
import url from "../../general/url";
const uid = sessionStorage.getItem("uid");
const token = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const PostFootContainer = ({
  post,
  setActivComment,
  activComment,
  nbComment,
  like,
  setLike,
  activModifPost,
  setActivModifPost,
  setDisplayPost,
  setTextModif,
}) => {
  const [nbLikes, setNbLikes] = useState(post.nb_likes);
  const commentaires = () => {
    if (activComment === true) {
      setActivComment(false);
    } else {
      setActivComment(true);
    }
  };
  const modifPost = () => {
    if (activModifPost === false) {
      setActivModifPost(true);
    } else {
      const reponse = window.confirm(
        "Souhaitez-vous annuler vos modifications ?"
      );
      if (reponse === true) {
        setActivModifPost(false);
        setTextModif(post.publication);
      }
    }
  };
  const liker = () => {
    function updateLike(nb, boolean) {
      let objet = {
        uid: uid,
        likes: nb,
      };
      axios
        .put(url.like + post.post_id, objet, config)
        .then((objet) => {
          setLike(boolean);
          setNbLikes(objet.data.nbLikes);
        })
        .catch((error) => console.log(error));
    }

    if (like === false) updateLike(1, true);
    else updateLike(0, false);
  };
  const supprPost = () => {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment supprimer cet article ?"
    );
    if (reponse === true) {
      axios
        .delete(url.post + "/" + post.post_id, config)
        .then(() => setDisplayPost(false))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="post-foot-container">
      <div className="post-reactions">
        <div className="post-comment">
          <i
            className="far fa-comment-dots"
            title="commenter"
            onClick={commentaires}
          ></i>
          <div className="post-number">
            {post.nb_commentaires > 0 ? nbComment : null}
          </div>
        </div>
        <div className="post-like">
          <div className={like ? "like-effect" : null}>
            <i className="fas fa-thumbs-up" title="liker" onClick={liker}></i>
          </div>
          <div className="post-number">{nbLikes > 0 ? nbLikes : null}</div>
        </div>
      </div>
      <div>
        <div id="post-modif">
          {post.uid === uid ? (
            <div>
              <i
                className="fas fa-edit"
                title="modifier"
                onClick={modifPost}
              ></i>
              <i
                className="fas fa-trash-alt"
                title="supprimer"
                onClick={supprPost}
              ></i>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostFootContainer;
