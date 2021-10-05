import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentPosts from "./Comments/CommentPosts";
import url from "../../general/url";
import dateParser from "../../general/dateParser";
const uid = sessionStorage.getItem("uid");

const Post = ({ post }) => {
  const urlPost = url.post + "/" + post.post_id;
  const urlLike = url.like + post.post_id;
  const [imgDisplay, setImgDisplay] = useState(false);
  const [activComment, setActivComment] = useState(true);
  const [like, setLike] = useState(false);
  const [activNbLikes, setActivNbLikes] = useState(false);
  const [activModif, setActivModif] = useState(false);
  const [nbLikes, setNbLikes] = useState(post.nb_likes);
  const [nbComments, setNbComments] = useState(false);
  const [displayPost, setDisplayPost] = useState(true);
  let activLike = 0;

  const tabUsersLiked = JSON.parse(post.users_liked);
  if (tabUsersLiked.includes(uid)) activLike = 1;

  useEffect(() => {
    if (post.uid === uid) setActivModif(true);
    if (post.image_url === "") setImgDisplay(true);
    if (post.nb_likes > 0) setActivNbLikes(true);
    if (activLike === 1) setLike(true);
    // if (post.nb_commentaires > 0) setNbComments(true);
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
    if (like === false) {
      axios
        .put(urlLike, {
          uid: uid,
          likes: 1,
        })
        .then((objet) => {
          setLike(true);
          setActivNbLikes(true);
          setNbLikes(objet.data.nbLikes);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .put(urlLike, {
          uid: uid,
          likes: 0,
        })
        .then((objet) => {
          setLike(false);
          setNbLikes(objet.data.nbLikes);
          if (objet.data.nbLikes === 0) setActivNbLikes(false);
        })
        .catch((error) => console.log(error));
    }
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
              <div className="post-number">{activNbLikes ? nbLikes : null}</div>
            </div>
          </div>
          <div>
            <div id="post-modif" className={activModif ? "activ-img" : null}>
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
