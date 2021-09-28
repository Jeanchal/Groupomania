import React from "react";
import axios from "axios";

const userId = sessionStorage.getItem("userId");

const UpdateProfil = () => {
  axios
    .get("http://localhost:4000/api/profil/" + userId)
    .then((res) => {
      console.log(res.data.profil);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="profil-container">
      <h1>Mon profil</h1>
      <img src="./img/profil.jpg" id="imgProfil" alt="img-profil" />
      <div className="infosPublic">
        <div className="entete">
          <h3>À propos de moi</h3>
          <p className="lienModif">Modifier</p>
        </div>
        <div className="profilGrid">
          <div>Poste actuel</div>
          <div>...</div>
          <div>Bio</div>
          <div>...</div>
        </div>
      </div>
      <br />
      <br />
      <div className="infosPerso">
        <div className="entete">
          <h3>Mes infos personelles</h3>
          <p className="lienModif">Modifier</p>
        </div>
        <div className="profilGrid">
          <div>Pseudo</div>
          <div>Jano78</div>
          <div>Mot de passe</div>
          <div>**********</div>
          <div>Email</div>
          <div>jean@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
