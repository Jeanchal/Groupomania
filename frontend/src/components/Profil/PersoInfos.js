import React, { useEffect, useState } from "react";
import axios from "axios";
const uid = sessionStorage.getItem("uid");

const PersoInfos = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/" + uid)
      .then((res) => setUser(res.data.user[0]))
      .catch((error) => console.log(error));
  }, []);

  function savePersoInfos() {
    const reponse = window.confirm(
      "Souhaitez-vous vraiment modifier ces informations ?"
    );
    if (reponse === true) {
      axios
        .put("http://localhost:4000/api/user/" + uid, {
          email: email,
          password: password,
        })
        .then((res) => setUser(res.data.user[0]))
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="infos-container">
      <h3>Mes infos personelles</h3>
      <form action="" onSubmit={savePersoInfos}>
        <div className="profilGrid">
          <label htmlFor="email-profil">Adresse email</label>
          <input
            type="email-profil"
            name="email-profil"
            id="email-profil"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={user.email}
          />
          <label htmlFor="mdp-profil">Mot de passe</label>
          <input
            type="password"
            name="mdp-profil"
            id="mdp-profil"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="submit-infos">
          <input type="submit" value="Modifier" />
        </div>
      </form>
    </div>
  );
};

export default PersoInfos;
