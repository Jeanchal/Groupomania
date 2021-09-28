import React, { useEffect, useState } from "react";
import axios from "axios";
const userId = sessionStorage.getItem("userId");

const PublicInfos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/profil/" + userId)
      .then((res) => {
        setData(res.data.profil[0]);
        console.log(res.data.profil[0].photoProfil);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="infosPublic">
      <div className="entete">
        <h3>À propos de moi</h3>
        <p className="lienModif">Modifier</p>
      </div>
      <div className="profilGrid">
        <div>Poste actuel</div>
        <div>{data.fonction}</div>
        <div>Bio</div>
        <div>{data.bio}</div>
      </div>
    </div>
  );
};

export default PublicInfos;
