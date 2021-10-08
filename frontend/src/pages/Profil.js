import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ProfilContainer from "../components/Profil/ProfilContainer";
import Session from "../components/Session";

const Profil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <ProfilContainer />
      </main>
      <br />
      <br />
      <Session />
    </div>
  );
};

export default Profil;
