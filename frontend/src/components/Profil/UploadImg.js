import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../general/url";

const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");
const token = sessionStorage.getItem("token");
const nomImage = pseudo + ".jpg";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const UploadImg = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url.profil + "/" + uid, config)
      .then((res) => setData(res.data.profil))
      .catch((error) => console.log(error));
  }, []);

  const gestionImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", pseudo);
    data.append("file", file);
    console.log(data);

    axios
      .post(url.profilUpload, data, config)
      .then(() => console.log(data.file.filename))
      .catch((error) => console.log(error));

    axios
      .put(url.profil + "/" + uid, { photo_profil: nomImage }, config)
      .then(() => (window.location = "./profil"))
      .catch((error) => console.log(error, "erreur axios"));
  };

  return (
    <div id="img-container">
      <figure>
        <img
          src={
            data.photo_profil === undefined
              ? url.imageProfil + "profil.jpg"
              : url.imageProfil + data.photo_profil
          }
          id="imgProfil"
          alt="img-profil"
        />
      </figure>
      <form action="" onSubmit={gestionImage} className="uploadImg">
        <div className="imageSelect">
          <i className="fas fa-image" title="ajouter une image"></i>
          <input
            type="file"
            name="file"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".jpg, .jpeg, .png"
            className="imagePost"
            title="ajouter une image"
          />
          <input
            type="submit"
            value="Envoyer"
            className="submitPost"
            id="btn-image-profil"
          />
        </div>
      </form>
    </div>
  );
};

export default UploadImg;
