import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";

const Profil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <div className="profil-container">
          <h1>Mon profil</h1>
          <img src="./img/profil.jpg" id="imgProfil" alt="img-profil" />
          <div className="infosPublic">
            <h3>À propos de moi</h3>
            <div className="profilGrid">
              <div>Poste actuel</div>
              <div>...</div>
              <div className="lienModif">Ajouter</div>
              <div>Bio</div>
              <div>...</div>
              <div className="lienModif">Ajouter</div>
            </div>
          </div>
          <br />
          <div className="infosPerso">
            <h3>Mes infos personelles</h3>
            <div className="profilGrid">
              <div>Pseudo</div>
              <div>Jano78</div>
              <div className="lienModif">Modifier</div>
              <div>Mot de passe</div>
              <div>**********</div>
              <div className="lienModif">Modifier</div>
              <div>Email</div>
              <div>jean@gmail.com</div>
              <div className="lienModif">Modifier</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profil;
