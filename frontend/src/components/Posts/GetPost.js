import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./Comments/CreateComment";
import url from "../../general/url";
import dateParser from "../../general/dateParser";
const uid = sessionStorage.getItem("uid");

const GetPost = ({ post }) => {
  const urlPost = url.post + "/" + post.post_id;
  const urlLike = url.like + post.post_id;
  const [activComment, setActivComment] = useState(true);
  const [like, setLike] = useState(false);
  const [nbLikes, setNbLikes] = useState(post.nb_likes);
  const [displayPost, setDisplayPost] = useState(true);
  const [nbComment, setNbComment] = useState(post.nb_commentaires);
  let activLike = 0;

  const tabUsersLiked = JSON.parse(post.users_liked);
  if (tabUsersLiked.includes(uid)) activLike = 1;

  useEffect(() => {
    if (activLike === 1) setLike(true);
  }, []);

  const supprPost = () => {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment supprimer cet article ?"
    );
    if (reponse === true) {
      axios
        .delete(urlPost)
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
    function updateLike(nb, boolean) {
      axios
        .put(urlLike, {
          uid: uid,
          likes: nb,
        })
        .then((objet) => {
          setLike(boolean);
          setNbLikes(objet.data.nbLikes);
        })
        .catch((error) => console.log(error));
    }

    if (like === false) updateLike(1, true);
    else updateLike(0, false);
  };

  if (displayPost === true) {
    return (
      <div className="post-container">
        <div className="post-head-container">
          <h3 className="post-pseudo">{post.pseudo}</h3>
          <p>posté le {dateParser(post.date)}</p>
        </div>
        <div>
          {post.image_url === "" ? null : (
            <img
              src={url.imagePost + post.image_url}
              alt="publication"
              id="post-image"
            />
          )}
        </div>
        <div className="publication">{post.publication}</div>
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
                <i
                  className="fas fa-thumbs-up"
                  title="liker"
                  onClick={liker}
                ></i>
              </div>
              <div className="post-number">{nbLikes > 0 ? nbLikes : null}</div>
            </div>
          </div>
          <div>
            <div id="post-modif">
              {post.uid === uid ? (
                <div>
                  <button onClick={modifPost}>Modifier</button>
                  <button onClick={supprPost}>Supprimer</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={activComment ? "activ-img" : null}>
          <CreateComment post={post} setNbComment={setNbComment} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default GetPost;
