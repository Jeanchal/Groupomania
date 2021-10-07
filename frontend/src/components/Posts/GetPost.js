import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./Comments/CreateComment";
import url from "../../general/url";
import dateParser from "../../general/dateParser";
import PostFootContainer from "./PostFootContainer";

const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");
const date = Date.now();
const name = pseudo + date;
let nameImg;

const GetPost = ({ post, file, setFile, setData }) => {
  const [like, setLike] = useState(false);
  const [activComment, setActivComment] = useState(true);
  const [displayPost, setDisplayPost] = useState(true);
  const [nbComment, setNbComment] = useState(post.nb_commentaires);
  const [activModifPost, setActivModifPost] = useState(false);
  const [textModif, setTextModif] = useState(post.publication);

  useEffect(() => {
    const tabUsersLiked = JSON.parse(post.users_liked);
    if (tabUsersLiked.includes(uid)) setLike(true);
  }, []);

  function getData() {
    axios
      .get(url.post)
      .then((res) => setData(res.data.posts))
      .catch((error) => console.log(error));
  }

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const modifPost = (e) => {
    e.preventDefault();

    if (file === null && textModif === "") {
      alert("impossible de poster une publication vide !");
    } else {
      file === null ? (nameImg = "") : (nameImg = name + ".jpg");

      const data = new FormData();
      data.append("publication", textModif);
      data.append("image", nameImg);
      data.append("name", name);
      data.append("file", file);

      axios
        .put(url.post + "/" + post.post_id, data, config)
        .then(() => {
          getData();
          setActivModifPost(false);
          setFile(null);
        })
        .catch((error) => console.log(error));
    }
  };

  if (displayPost === true) {
    return (
      <div id="getPost-container">
        <div className="post-container">
          <div className="post-head-container">
            <h3 className="post-pseudo">{post.pseudo}</h3>
            <p>posté le {dateParser(post.date)}</p>
          </div>
          <div className={activModifPost ? "opacImage" : null}>
            {post.image === "" ? null : (
              <img
                src={url.imagePost + post.image}
                alt="publication"
                id="post-image"
              />
            )}
          </div>
          <div>
            {activModifPost ? (
              <form onSubmit={modifPost} method="post" id="formModif">
                <textarea
                  type="text"
                  name="publication"
                  id="publication"
                  onChange={(e) => setTextModif(e.target.value)}
                  value={textModif}
                  placeholder="Ecrire ici..."
                  className="post"
                />
                <div>
                  <i className="fas fa-image" title="ajouter une image"></i>
                  <input
                    type="file"
                    name="file"
                    id="image"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="imagePost"
                    title="ajouter une image"
                  />
                  <input
                    type="submit"
                    value="Modifier"
                    className="submitPost"
                  />
                </div>
              </form>
            ) : (
              <div className="publication">{textModif}</div>
            )}
          </div>
          <PostFootContainer
            post={post}
            setActivComment={setActivComment}
            activComment={activComment}
            nbComment={nbComment}
            like={like}
            setLike={setLike}
            activModifPost={activModifPost}
            setActivModifPost={setActivModifPost}
            setDisplayPost={setDisplayPost}
            setTextModif={setTextModif}
          />
          <div className={activComment ? "activ-img" : null}>
            <CreateComment post={post} setNbComment={setNbComment} />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default GetPost;