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
    <div className="infosPerso">
      <div className="entete">
        <h3>Mes infos personelles</h3>
        <p className="lienModif">Modifier</p>
      </div>
      <div className="profilGrid">
        <div>Pseudo</div>
        <div>{user.pseudo}</div>
        <div>Mot de passe</div>
        <div>**********</div>
        <div>Email</div>
        <div>{user.email}</div>
      </div>
    </div>
  );
};

export default PersoInfos;
