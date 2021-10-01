import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import PublicInfos from "../components/Profil/PublicInfos";
import PersoInfos from "../components/Profil/PersoInfos";
import UploadImg from "../components/Profil/UploadImg";
import SupprProfil from "../components/Profil/SupprProfil";
const pseudo = sessionStorage.getItem("pseudo");

const Profil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <div className="profil-container">
          <h1>{pseudo}</h1>
          <UploadImg />
          <PublicInfos />
          <br />
          <br />
          <PersoInfos />
          <br />
          <br />
          <SupprProfil />
        </div>
      </main>
    </div>
  );
};

export default Profil;
