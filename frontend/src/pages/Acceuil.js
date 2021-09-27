import React, { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const userId = sessionStorage.getItem("userId");
console.log(userId);

const Acceuil = () => {
  const [publication, setPublication] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createPost = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:4000/api/post`,
      data: {
        userId: userId,
        publication: publication,
        imageUrl: imageUrl,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <div className="acceuil-container">
          <br />
          <div className="posts-container">
            <form action="" onSubmit={createPost}>
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
                <input type="submit" value="Publier" className="submitPost" />
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
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Acceuil;
