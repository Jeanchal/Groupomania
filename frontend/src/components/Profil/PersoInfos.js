import React, { useState } from "react";
import axios from "axios";
import url from "../../general/url";

const uid = sessionStorage.getItem("uid");
const token = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const PersoInfos = ({ user, setUser }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(user.email);

  function savePersoInfos(e) {
    e.preventDefault();
    let message;
    let reponse;
    let objet;

    if (password === "" && newPassword === "") {
      message = "Attention, Souhaitez-vous vraiment modifier votre email ?";
      reponse = window.confirm(message);
      if (reponse === true) {
        axios
          .put(url.user + "/" + uid, { email: email }, config)
          .then((res) => setUser(res.data.user[0]))
          .catch((error) => console.log(error));
      }
    } else {
      if (password === newPassword) {
        message =
          "Attention, Souhaitez-vous vraiment modifier votre email et mot de passe ?";
        reponse = window.confirm(message);
        if (reponse === true) {
          objet = {
            email: email,
            password: password,
          };
          axios
            .put(url.user + "/" + uid, objet, config)
            .then((res) => setUser(res.data.user[0]))
            .catch((error) => console.log(error));
        }
      } else {
        const mdpError = document.querySelector(".mdp-Error");
        mdpError.innerText =
          "Attention, le mot de passe doit être identique...";
      }
    }
  }

  return (
    <div className="infos-container">
      <h3>Informations Personelles</h3>
      <form action="" onSubmit={savePersoInfos}>
        <div className="profilGrid">
          <label htmlFor="email-profil">Adresse email</label>
          <input
            type="email-profil"
            name="email-profil"
            id="email-profil"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={user.email}
          />
          <label htmlFor="mdp-profil">Nouveau mot de passe</label>
          <input
            type="password"
            name="mdp-profil"
            id="mdp-profil"
            minLength="5"
            maxLength="12"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="new-mdp-profil">Confirmer mot de passe</label>
          <input
            type="password"
            name="new-mdp-profil"
            id="new-mdp-profil"
            minLength="5"
            maxLength="12"
            placeholder="********"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mdp-Error"></div>
        <div className="submit-infos">
          <input type="submit" value="Modifier" />
        </div>
      </form>
    </div>
  );
};

export default PersoInfos;
