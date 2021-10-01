import React, { useState } from "react";
import axios from "axios";
const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");

const CreatePosts = () => {
  const name = pseudo + Date.now();
  const urlImage = "http://localhost:4000/images/posts/" + name + ".jpg";
  const url = "http://localhost:4000/api/post/";
  const [file, setFile] = useState(null);
  const [publication, setPublication] = useState("");

  function postImage() {
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    console.log(data.file);

    axios
      .post(url + "upload", data)
      .then(() => console.log(data.file.filename))
      .catch((error) => console.log(error));
  }

  function savePost(img) {
    axios
      .post(url, {
        uid: uid,
        pseudo: pseudo,
        publication: publication,
        image_url: img,
        date: Date.now(),
      })
      .then(() => (window.location = "/acceuil"))
      .catch((error) => console.log(error));
  }

  const createPost = (e) => {
    e.preventDefault();

    if (file === null) {
      savePost("");
    } else {
      postImage();
      savePost(urlImage);
    }
  };

  return (
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
  );
};

export default CreatePosts;
