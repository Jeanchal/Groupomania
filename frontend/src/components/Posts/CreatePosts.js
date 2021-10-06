import React, { useState } from "react";
import axios from "axios";
import url from "../../general/url";
const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");

const CreatePosts = ({ setData, activModifPost, post }) => {
  const date = Date.now();
  const name = pseudo + date;
  const [file, setFile] = useState(null);
  const [publication, setPublication] = useState("");

  function getData() {
    axios
      .get(url.post)
      .then((res) => setData(res.data.posts))
      .catch((error) => console.log(error));
  }

  const createPost = (e) => {
    e.preventDefault();

    if (file === null && publication === "") {
      alert("impossible de poster une publication vide !");
    } else {
      let nameImg;
      file === null ? (nameImg = "") : (nameImg = name + ".jpg");

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const data = new FormData();
      data.append("uid", uid);
      data.append("pseudo", pseudo);
      data.append("publication", publication);
      data.append("image_url", nameImg);
      data.append("date", date);
      data.append("name", name);
      data.append("file", file);

      axios
        .post(url.post, data, config)
        .then(() => {
          getData();
          setFile(null);
          setPublication("");
        })
        .catch((error) => console.log(error));
    }
  };

  const modifPost = (e) => {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment modifier cet article ?"
    );
    if (reponse === true) {
      if (file === null && publication === "") {
        alert("impossible de poster une publication vide !");
      } else {
        let nameImg;
        file === null ? (nameImg = "") : (nameImg = name + ".jpg");

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        const data = new FormData();
        data.append("publication", publication);
        data.append("image_url", nameImg);
        data.append("date", date);
        data.append("name", name);
        data.append("file", file);

        axios
          .put(url.post + "/" + post.post_id, data, config)
          .then(() => {
            getData();
            setFile(null);
            setPublication("");
          })
          .catch((error) => console.log(error));
      }
    }
    e.preventDefault();
  };

  return (
    <form onSubmit={activModifPost ? modifPost : createPost} method="post">
      <textarea
        type="text"
        name="publication"
        id="publication"
        onChange={(e) => setPublication(e.target.value)}
        value={publication}
        placeholder={
          activModifPost ? "Ecrire ici pour modifier..." : "Quoi de neuf?"
        }
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
        <input
          type="submit"
          value={activModifPost ? "Modifier" : "Publier"}
          className="submitPost"
        />
      </div>
    </form>
  );
};

export default CreatePosts;
