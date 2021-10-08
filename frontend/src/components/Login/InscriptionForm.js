import React, { useState } from "react";
import axios from "axios";
import url from "../../general/url";

const InscriptionForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gestionInscription = (e) => {
    e.preventDefault();
    const form = document.querySelector(".form");
    const msgError = document.getElementById("inscriptError");

    if (form.password.value === form.confirmPassword.value) {
      axios
        .post(url.signup, {
          pseudo: pseudo,
          email: email,
          password: password,
        })
        .then((res) => {
          alert("Bienvenue " + pseudo);
          sessionStorage.setItem("pseudo", res.data.pseudo);
          sessionStorage.setItem("uid", res.data.uid);
          sessionStorage.setItem("token", res.data.token);
          window.location = "/profil";
        })
        .catch((error) => {
          console.log(error);
          msgError.innerText = "Erreur, saisie incorrecte...";
        });
    } else {
      msgError.textContent = "Attention, mot de passe incorrect...";
    }
  };

  return (
    <div>
      <form action="" onSubmit={gestionInscription} className="form">
        <label htmlFor="pseudo">Pseudo</label>
        <input
          type="text"
          name="pseudo"
          id="pseudo"
          minLength="4"
          maxLength="15"
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo}
          className="input"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          minLength="4"
          maxLength="25"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input"
        />
        <label htmlFor="password">Mot de Passe</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength="5"
          maxLength="12"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input"
        />
        <label htmlFor="confirmPassword">Confirmer Mot de Passe</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          minLength="5"
          maxLength="12"
          className="input"
        />
        <div id="inscriptError"></div>
        <input type="submit" value="S'inscrire" id="submit" />
      </form>
    </div>
  );
};

export default InscriptionForm;
