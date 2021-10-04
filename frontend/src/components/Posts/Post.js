import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentPosts from "./Comments/CommentPosts";
// const uid = sessionStorage.getItem("uid");

const Post = ({ post }) => {
  const url = "http://localhost:4000/api/post/" + post.post_id;
  const [imgDisplay, setImgDisplay] = useState(false);
  const [activComment, setActivComment] = useState(true);
  const [like, setLike] = useState(false);
  const [nbLikes, setNbLikes] = useState(false);
  const [nbComments, setNbComments] = useState(false);
  const [displayPost, setDisplayPost] = useState(true);

  useEffect(() => {
    if (post.image_url === "") {
      setImgDisplay(true);
    }
    if (post.nb_likes > 0) {
      setNbLikes(true);
    }
    if (post.nb_commentaires > 0) {
      setNbComments(true);
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
        .then(() => setDisplayPost(false))
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
      //     image_url: urlImage,
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

    axios
      .put(url, {
        nb_likes: 1,
      })
      .then(() => console.log("requête ok"))
      .catch((error) => console.log(error));
  };

  if (displayPost === true) {
    return (
      <div className="post-container">
        <div className="post-head-container">
          <h3 className="post-pseudo">{post.pseudo}</h3>
          <p>posté le {dateParser(post.date)}</p>
        </div>
        <div>
          {imgDisplay ? null : (
            <img src={post.image_url} alt="publication" id="post-image" />
          )}
        </div>
        <div>{post.publication}</div>
        <div className="post-foot-container">
          <div className="post-reactions">
            <div className="post-comment">
              <i
                className="far fa-comment-dots"
                title="commenter"
                onClick={commentaires}
              ></i>
              <div className="post-number">
                {nbComments ? post.nb_commentaires : null}
              </div>
            </div>
            <div className="post-like">
              <div className={like ? "like-effect" : null}>
                <i
                  className="fas fa-thumbs-up"
                  title="liker"
                  onClick={liker}
                ></i>
              </div>
              <div className="post-number">
                {nbLikes ? post.nb_likes : null}
              </div>
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
          <CommentPosts post={post} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Post;
