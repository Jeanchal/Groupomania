import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../general/url";
import GetPosts from "./GetPosts";

const PostContainer = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [publication, setPublication] = useState("");
  const [auth] = useState({
    uid: window.sessionStorage.uid,
    pseudo: window.sessionStorage.pseudo,
    token: window.sessionStorage.token,
  });

  function getData() {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
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
      let name = auth.pseudo + Date.now();
      file === null ? (nameImg = "") : (nameImg = name + ".jpg");

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const data = new FormData();
      data.append("uid", auth.uid);
      data.append("pseudo", auth.pseudo);
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
          <GetPosts
            auth={auth}
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
