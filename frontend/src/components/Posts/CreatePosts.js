import React, { useState } from "react";
import axios from "axios";

const CreatePosts = () => {
  const [publication, setPublication] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createPost = (e) => {
    const imgUrl =
      "http://localhost:4000/images/" +
      imageUrl.replace(/\\/g, "").replace("C:fakepath", "");

    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:4000/api/post`,
      data: {
        userId: sessionStorage.getItem("userId"),
        pseudo: sessionStorage.getItem("pseudo"),
        publication: publication,
        imageUrl: imgUrl,
      },
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
            name="imageUrl"
            id="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
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
