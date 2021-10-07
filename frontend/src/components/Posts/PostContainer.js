import React, { useEffect, useState } from "react";
import GetPost from "./GetPost";
import axios from "axios";
import url from "../../general/url";

const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");
const token = sessionStorage.getItem("token");

const PostContainer = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [publication, setPublication] = useState("");

  function getData() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url.post, config)
      .then((res) => setData(res.data.posts))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);

  const createPost = (e) => {
    e.preventDefault();

    if (file === null && publication === "") {
      alert("impossible de poster une publication vide !");
    } else {
      let nameImg;
      let name = pseudo + Date.now();
      file === null ? (nameImg = "") : (nameImg = name + ".jpg");

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = new FormData();
      data.append("uid", uid);
      data.append("pseudo", pseudo);
      data.append("publication", publication);
      data.append("image", nameImg);
      data.append("date", Date.now());
      data.append("name", name);
      data.append("file", file);

      axios
        .post(url.post, data, config)
        .then(() => {
          getData();
          setPublication("");
          setFile(null);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="acceuil-container">
      <div className="post-container">
        <form onSubmit={createPost} method="post" id="formCreate">
          <textarea
            type="text"
            name="publication"
            id="publication"
            onChange={(e) => setPublication(e.target.value)}
            value={publication}
            placeholder="Quoi de neuf?"
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
            <input type="submit" value="Publier" className="submitPost" />
          </div>
        </form>
      </div>
      {data
        .sort((a, b) => b.date - a.date)
        .map((post) => (
          <GetPost
            post={post}
            key={post.post_id}
            setFile={setFile}
            file={file}
            setData={setData}
          />
        ))}
    </div>
  );
};

export default PostContainer;
