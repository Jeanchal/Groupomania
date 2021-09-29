import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import PublicInfos from "../components/Profil/PublicInfos";
import PersoInfos from "../components/Profil/PersoInfos";
import UploadImg from "../components/Profil/UploadImg";

const Profil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <div className="profil-container">
          <h1>{sessionStorage.getItem("pseudo")}</h1>
          <UploadImg />
          <PublicInfos />
          <br />
          <br />
          <PersoInfos />
        </div>
      </main>
    </div>
  );
};

export default Profil;
