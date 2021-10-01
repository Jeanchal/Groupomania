import React, { useEffect, useState } from "react";
import axios from "axios";
const uid = sessionStorage.getItem("uid");

const SupprProfil = () => {
  const [password, setPassword] = useState();

  function deleteUser() {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment supprimer votre compte définitivement ?"
    );
    if (reponse === true) {
      axios
        .delete("http://localhost:4000/api/user/" + uid)
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
        <div className="supp-container">
          <input
            type="password"
            name="mdp-supprProfil"
            id="mdp-supprProfil"
            placeholder="Entrer votre mot de passe... "
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="submit-infos">
            <input type="submit" value="Supprimer le compte" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SupprProfil;
