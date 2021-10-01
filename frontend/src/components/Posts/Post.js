import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentPosts from "./Comments/CommentPosts";
const userId = sessionStorage.getItem("userId");

const Post = ({ post }) => {
  const url = "http://localhost:4000/api/post/" + userId;
  const urlDefault = "http://localhost:4000/images/posts/default.jpg";
  const [imgDisplay, setImgDisplay] = useState(false);
  const [activComment, setActivComment] = useState(true);
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (post.imageUrl === "") {
      setImgDisplay(true);
    }
  }, []);

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

  const supprPost = () => {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment supprimer cet article ?"
    );
    if (reponse === true) {
      axios
        .delete(url)
        .then(() => (window.location = "/acceuil"))
        .catch((error) => console.log(error));
    }
  };

  const modifPost = () => {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment modifier cet article ?"
    );
    if (reponse === true) {
      // axios
      //   .put(url, {
      //     publication: publication,
      //     imageUrl: urlImage,
      //   })
      //   .then(() => (window.location = "/acceuil"))
      //   .catch((error) => console.log(error));
    }
  };

  const commentaires = () => {
    if (activComment === true) {
      setActivComment(false);
    } else {
      setActivComment(true);
    }
  };

  const liker = () => {
    if (like === true) {
      setLike(false);
    } else {
      setLike(true);
    }
  };

  return (
    <div className="post-container">
      <div className="post-head-container">
        <h3 className="post-pseudo">{post.pseudo}</h3>
        <p>posté le {dateParser(post.date)}</p>
      </div>
      <img
        src={imgDisplay ? urlDefault : post.imageUrl}
        alt="publication"
        id="post-image"
        className={imgDisplay ? "activ-img" : null}
      />
      <div>{post.publication}</div>
      <div className="post-foot-container">
        <div className="post-reactions">
          <div className="post-comment">
            <i
              className="far fa-comment-dots"
              title="commenter"
              onClick={commentaires}
            ></i>
            <div className="post-number">1</div>
          </div>
          <div className="post-like">
            <div className={like ? "like-effect" : null}>
              <i className="fas fa-thumbs-up" title="liker" onClick={liker}></i>
            </div>
            <div className="post-number">1</div>
          </div>
        </div>
        <div>
          <div className="post-modif">
            <button onClick={modifPost}>Modifier</button>
            <button onClick={supprPost}>Supprimer</button>
          </div>
        </div>
      </div>
      <div className={activComment ? "activ-img" : null}>
        <CommentPosts />
      </div>
    </div>
  );
};

export default Post;
