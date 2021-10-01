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

const GetComments = ({ comment }) => {
  return (
    <div className="comment-container">
      <div className="comment-pseudo">{comment.pseudo}</div>
      <div className="commentaire">{comment.commentaire}</div>
      <div className="comment-date">
        posté le {dateParser(comment.createdAt)}
      </div>
    </div>
  );
};

export default GetComments;
