import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../general/url";
// import history from "../../general/history";
const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");
const nomImage = pseudo + ".jpg";

const UploadImg = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url.profil + "/" + uid)
      .then((res) => setData(res.data.profil[0]))
      .catch((error) => console.log(error));
  }, []);

  const gestionImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", pseudo);
    data.append("file", file);
    console.log(data);

    axios
      .post(url.profilUpload, data)
      .then(() => console.log(data.file.filename))
      .catch((error) => console.log(error));

    axios
      .put(url.profil + "/" + uid, {
        photo_profil: nomImage,
      })
      .then(() => (window.location = "./profil"))
      .catch((error) => console.log(error, "erreur axios"));
  };

  return (
    <div id="img-container">
      <figure>
        <img
          src={url.imageProfil + data.photo_profil}
          id="imgProfil"
          alt="img-profil"
        />
      </figure>
      <form action="" onSubmit={gestionImage} className="uploadImg">
        <input
          type="file"
          id="file"
          name="image"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input type="submit" value="Envoyer" id="btn-image-profil" />
      </form>
    </div>
  );
};

export default UploadImg;
