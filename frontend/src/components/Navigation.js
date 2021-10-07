import React from "react";
import { NavLink } from "react-router-dom";

const logOut = () => {
  const reponse = window.confirm("Souhaitez-vous vraiment vous déconnecter ?");
  if (reponse === true) {
    window.location = "/";
    sessionStorage.clear();
  }
};

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink exact to="acceuil" activeClassName="nav-active">
        <i title="acceuil" className="fas fa-home"></i>
      </NavLink>
      <NavLink exact to="profil" activeClassName="nav-active">
        <i title="mon profil" className="fas fa-user"></i>
      </NavLink>
      <NavLink exact to="#" onClick={logOut}>
        <i title="se déconnecter" className="fas fa-door-open"></i>
      </NavLink>
    </div>
  );
};

export default Navigation;
