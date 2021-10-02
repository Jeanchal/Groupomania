import React from "react";

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
  if (post.post_id === comment.post_id) {
    return (
      <div className="comment-container">
        <div className="comment-pseudo">{comment.pseudo}</div>
        <div className="commentaire">{comment.commentaire}</div>
        <div className="modif-comment">
          <p>posté le {dateParser(comment.createdAt)}</p>
          <div>
            <i className="fas fa-trash-alt"></i>
            <i className="fas fa-edit"></i>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default GetComments;
