import React from "react";

const Post = ({ post }) => {
  return (
    <div className="post-container">
      <div className="post-pseudo">{post.pseudo}</div>
      <img src={post.imageUrl} alt="publication" className="post-image" />
      <div>{post.publication}</div>
    </div>
  );
};

export default Post;
