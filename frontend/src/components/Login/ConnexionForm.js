import React, { useState } from "react";
import axios from "axios";
import url from "../../general/url";

const ConnexionForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gestionConnexion = (e) => {
    e.preventDefault();
    const msgError = document.getElementById("connectError");

    axios
      .post(url.user, {
        email: email,
        password: password,
      })
      .then((res) => {
        alert("Bonjour " + res.data.pseudo + ", content de vous revoir...");
        console.log("Status: " + res.status + ", Utilisateur connecté !");
        sessionStorage.setItem("pseudo", res.data.pseudo);
        sessionStorage.setItem("uid", res.data.uid);
        sessionStorage.setItem("token", res.data.token);
        window.location = "/acceuil";
      })
      .catch((error) => {
        console.log(error);
        msgError.innerText = "Erreur ! email ou mot de passe incorrects";
      });
  };

  return (
    <div>
      <form action="" onSubmit={gestionConnexion} className="form">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input"
        />
        <label htmlFor="password">Mot de Passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input"
        />
        <div id="connectError"></div>
        <input type="submit" value="Se connecter" id="submit" />
      </form>
    </div>
  );
};

export default ConnexionForm;
