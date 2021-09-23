import React from "react";
import { NavLink } from "react-router-dom";

const logOut = () => {
  const reponse = window.confirm("Souhaitez-vous vraiment vous déconnecter ?");
  if (reponse === true) {
    window.location = "/";
  }
};

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink exact to="acceuil" activeClassName="nav-active">
        <i title="acceuil" class="fas fa-home"></i>
      </NavLink>
      <NavLink exact to="profil" activeClassName="nav-active">
        <i title="profil" class="fas fa-user"></i>
      </NavLink>
      <NavLink exact to="#" onClick={logOut}>
        <i title="se déconnecter" class="fas fa-door-open"></i>
      </NavLink>
    </div>
  );
};

export default Navigation;
