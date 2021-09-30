import React, { useEffect, useState } from "react";
import axios from "axios";
const userId = sessionStorage.getItem("userId");

const Post = ({ post }) => {
  const url = "http://localhost:4000/api/post/" + userId;
  const [imgDisplay, setImgDisplay] = useState(false);

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
    const reponse = window.confirm("Souhaitez-vous supprimer cet article ?");
    if (reponse === true) {
      axios
        .delete(url)
        .then(() => (window.location = "/acceuil"))
        .catch((error) => console.log(error));
    }
  };

  const modifPost = () => {
    const reponse = window.confirm("Souhaitez-vous modifier cet article ?");
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

  return (
    <div className="post-container">
      <div className="post-head-container">
        <h3 className="post-pseudo">{post.pseudo}</h3>
        <p>posté le {dateParser(post.date)}</p>
      </div>
      <img
        src={
          imgDisplay
            ? "http://localhost:4000/images/posts/default.jpg"
            : post.imageUrl
        }
        alt="publication"
        id="post-image"
        className={imgDisplay ? "activ-img" : null}
      />
      <div>{post.publication}</div>
      <div className="post-foot-container">
        <div className="post-reactions">
          <div className="post-comment">
            <i className="far fa-comment-dots" title="commenter"></i>
            <div className="post-number">1</div>
          </div>
          <div className="post-like">
            <i className="fas fa-thumbs-up" title="liker"></i>
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
    </div>
  );
};

export default Post;
