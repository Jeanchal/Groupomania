import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../general/url";
import PublicInfos from "./PublicInfos";
import PersoInfos from "./PersoInfos";
import UploadImg from "./UploadImg";
import SupprProfil from "./SupprProfil";

const uid = sessionStorage.getItem("uid");
const pseudo = sessionStorage.getItem("pseudo");
const token = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const ProfilContainer = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(url.user + "/" + uid, config)
      .then((res) => setUser(res.data.user[0]))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="profil-container">
      <h1>{pseudo}</h1>
      <UploadImg />
      <PublicInfos />
      <PersoInfos user={user} setUser={setUser} />
      <SupprProfil />
    </div>
  );
};

export default ProfilContainer;
