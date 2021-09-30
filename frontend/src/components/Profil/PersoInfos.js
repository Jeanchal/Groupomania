import React, { useEffect, useState } from "react";
import axios from "axios";
const userId = sessionStorage.getItem("userId");

const PersoInfos = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/" + userId)
      .then((res) => {
        setUser(res.data.user[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="infos-container">
      <h3>Mes infos personelles</h3>
      <form action="">
        <div className="profilGrid">
          <label htmlFor="email-profil">Adresse email</label>
          <input
            type="email-profil"
            name="email-profil"
            id="email-profil"
            placeholder={user.email}
          />
          <label htmlFor="mdp-profil">Mot de passe</label>
          <input
            type="password"
            name="mdp-profil"
            id="mdp-profil"
            placeholder="********"
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
