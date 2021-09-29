import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadImg = () => {
  const [file, setFile] = useState();
  const userId = sessionStorage.getItem("userId");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/profil/" + userId)
      .then((res) => {
        setData(res.data.profil[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const gestionImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);

    axios
      .post("http://localhost:4000/upload", data)
      .then((res) => {
        console.log("image postée");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="img-container">
      <figure>
        <img src={data.photoProfil} id="imgProfil" alt="img-profil" />
      </figure>
      <form action="" onSubmit={gestionImage} className="uploadImg">
        <input
          type="file"
          id="file"
          name="image"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default UploadImg;
