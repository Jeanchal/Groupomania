import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <UpdateProfil />
      </main>
    </div>
  );
};

export default Profil;
