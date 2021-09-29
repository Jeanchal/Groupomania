import React, { useState } from "react";
import axios from "axios";

const InscriptionForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gestionInscription = (e) => {
    e.preventDefault();
    const form = document.querySelector(".form");
    const msgError = document.getElementById("inscriptError");

    if (form.password.value === form.confirmPassword.value) {
      axios({
        method: "post",
        url: `http://localhost:4000/api/user/signup`,
        data: {
          pseudo: pseudo,
          email: email,
          password: password,
        },
      })
        .then((res) => {
          alert("Bienvenue " + pseudo);
          sessionStorage.setItem("pseudo", res.data.pseudo);
          sessionStorage.setItem("userId", res.data.userId);
          sessionStorage.setItem("token", res.data.token);
          window.location = "/acceuil";
          axios({
            method: "post",
            url: `http://localhost:4000/api/user/signup`,
            data: {
              pseudo: pseudo,
              email: email,
              password: password,
            },
          })
            .then((res) => {
              alert("Bienvenue " + pseudo);
              sessionStorage.setItem("pseudo", res.data.pseudo);
              sessionStorage.setItem("userId", res.data.userId);
              sessionStorage.setItem("token", res.data.token);
              window.location = "/acceuil";
            })
            .catch((error) => {
              console.log(error);
              msgError.innerText = "Erreur ! saisie incorrecte";
            });
        })
        .catch((error) => {
          console.log(error);
          msgError.innerText = "Erreur ! saisie incorrecte";
        });
    } else {
      msgError.textContent = "Attention, mot de passe incorrect !";
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
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo}
          className="input"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
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
        <label htmlFor="confirmPassword">Confirmer Mot de Passe</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="input"
        />
        <div id="inscriptError"></div>
        <input type="submit" value="S'inscrire" id="submit" />
      </form>
    </div>
  );
};

export default InscriptionForm;
