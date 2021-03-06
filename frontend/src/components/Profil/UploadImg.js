import React, { useState } from "react";
import axios from "axios";
import url from "../../general/url";

const UploadImg = ({ uid, auth, profil }) => {
  const [file, setFile] = useState(null);
  const nomImage = auth.pseudo + ".jpg";
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  const gestionImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", auth.pseudo);
    data.append("file", file);

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
            profil.photo_profil === undefined
              ? url.imageProfil + "profil.jpg"
              : url.imageProfil + profil.photo_profil
          }
          id="imgProfil"
          alt="img-profil"
        />
      </figure>
      {auth.uid === uid ? (
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
      ) : null}
    </div>
  );
};

export default UploadImg;
