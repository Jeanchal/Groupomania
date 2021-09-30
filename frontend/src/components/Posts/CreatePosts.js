import React, { useState } from "react";
import axios from "axios";
const userId = sessionStorage.getItem("userId");
const pseudo = sessionStorage.getItem("pseudo");

const CreatePosts = () => {
  const name = pseudo + Date.now();
  const urlImage = "http://localhost:4000/images/posts/" + name + ".jpg";
  const url = "http://localhost:4000/api/post/";
  const [file, setFile] = useState();
  const [publication, setPublication] = useState("");

  const createPost = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    console.log(data.file);

    axios
      .post(url + "upload", data)
      .then(() => console.log(data.file.filename))
      .catch((error) => console.log(error));

    axios
      .post(url, {
        userId: userId,
        pseudo: pseudo,
        publication: publication,
        imageUrl: urlImage,
        date: Date.now(),
      })
      .then(() => {
        window.location = "/acceuil";
      })
      .catch((error) => {
        console.log(error);
      });
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
            id="imageUrl"
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
