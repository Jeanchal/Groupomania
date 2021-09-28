import React, { useState } from "react";
import axios from "axios";

const ConnexionForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gestionConnexion = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `http://localhost:4000/api/user/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        alert("Bonjour " + res.data.pseudo + ", content de vous revoir...");
        console.log("Status: " + res.status + ", Utilisateur connecté !");
        sessionStorage.setItem("pseudo", res.data.pseudo);
        sessionStorage.setItem("userId", res.data.userId);
        sessionStorage.setItem("token", res.data.token);
        window.location = "/acceuil";
      })
      .catch((error) => {
        console.log(error);
        console.log("Erreur: email ou mot de passe incorrects");
        const msgError = document.getElementById("connectError");
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
