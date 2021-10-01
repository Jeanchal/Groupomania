import React, { useEffect, useState } from "react";
import axios from "axios";
const userId = sessionStorage.getItem("userId");

const SupprProfil = () => {
  const [password, setPassword] = useState();

  function deleteUser() {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment supprimer votre compte définitivement ?"
    );
    if (reponse === true) {
      axios
        .delete("http://localhost:4000/api/user/" + userId)
        .then((res) => {
          window.location = "/";
          sessionStorage.clear();
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="infos-container">
      <h3>Supprimer le compte</h3>
      <form action="" onSubmit={deleteUser}>
        <div className="profilGrid">
          <label htmlFor="mdp-profil">Entrer votre mot de passe</label>
          <input
            type="password"
            name="mdp-profil"
            id="mdp-profil"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit-infos">
          <input type="submit" value="Supprimer le compte" />
        </div>
      </form>
    </div>
  );
};

export default SupprProfil;
