import React, { useState } from "react";
import axios from "axios";
import url from "../../general/url";
const uid = sessionStorage.getItem("uid");

const SupprProfil = () => {
  const [password, setPassword] = useState();

  function deleteUser(e) {
    e.preventDefault();
    const reponse = window.confirm(
      "Souhaitez-vous vraiment supprimer votre compte définitivement ?"
    );
    if (reponse === true) {
      axios
        .post(url.user + "/" + uid, {
          password: password,
        })
        .then(() => {
          window.location = "./";
          sessionStorage.clear();
        })
        .catch(() => {
          const msgError = document.getElementById("inscriptError");
          msgError.innerText = "Erreur, mot de passe incorrect !";
        });
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
      <div id="inscriptError"></div>
    </div>
  );
};

export default SupprProfil;
