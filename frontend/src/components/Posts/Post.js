import React, { useState } from "react";

const Post = ({ post }) => {
  const [imgDisplay, setImgDisplay] = useState(false);

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

  console.log(post.imageUrl);
  console.log(post.date);

  return (
    <div className="post-container">
      <div className="post-head-container">
        <h3 className="post-pseudo">{post.pseudo}</h3>
        <p>posté le {dateParser(post.date)}</p>
      </div>
      <img
        src={post.imageUrl}
        alt="publication"
        id="post-image"
        className={imgDisplay ? "activ-img" : null}
      />
      <div>{post.publication}</div>
      <div className="post-modif-container">
        <button>Modifier</button>
        <button>Supprimer</button>
      </div>
    </div>
  );
};

export default Post;
