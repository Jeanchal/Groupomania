import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import url from "../../general/url";
const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");

const CreatePosts = () => {
  const name = pseudo + Date.now();
  const nameImg = name + ".jpg";
  const [file, setFile] = useState(null);
  const [publication, setPublication] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url.post)
      .then((res) => setData(res.data.posts))
      .catch((error) => console.log(error));
  }, []);

  function postImage() {
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    console.log(data.file);

    axios
      .post(url.postUpload, data)
      .then(() => console.log(data.file.filename))
      .catch((error) => console.log(error));
  }

  function savePost(img) {
    axios
      .post(url.post, {
        uid: uid,
        pseudo: pseudo,
        publication: publication,
        image_url: img,
        date: Date.now(),
      })
      .then((res) => setData(res.data.posts))
      .catch((error) => console.log(error));
  }

  const createPost = (e) => {
    e.preventDefault();

    if (file === null) {
      savePost("");
      setPublication("");
    } else {
      postImage();
      savePost(nameImg);
      setPublication("");
    }
  };

  return (
    <div className="acceuil-container">
      <div className="post-container">
        <form onSubmit={createPost} method="post">
          <textarea
            type="text"
            name="publication"
            id="publication"
            onChange={(e) => setPublication(e.target.value)}
            value={publication}
            placeholder="Quoi de neuf ?"
            className="post"
          />
          <div>
            <i className="fas fa-image" title="ajouter une image"></i>
            <input
              type="file"
              name="file"
              id="image_url"
              onChange={(e) => setFile(e.target.files[0])}
              className="imagePost"
              title="ajouter une image"
            />
            <input type="submit" value="Publier" className="submitPost" />
          </div>
        </form>
      </div>
      <div id="getPost-container">
        {data
          .sort((a, b) => b.date - a.date)
          .map((post) => (
            <Post post={post} key={post.post_id} />
          ))}
      </div>
    </div>
  );
};

export default CreatePosts;
