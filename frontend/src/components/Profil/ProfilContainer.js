import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../general/url";
import PublicInfos from "./PublicInfos";
import PersoInfos from "./PersoInfos";
import UploadImg from "./UploadImg";
import SupprProfil from "./SupprProfil";

const ProfilContainer = () => {
  const [auth] = useState({
    uid: window.sessionStorage.uid,
    pseudo: window.sessionStorage.pseudo,
    token: window.sessionStorage.token,
  });
  const [uid] = useState("50e033e0-6d73-11ec-a302-e36e260155a8");
  const [user, setUser] = useState([]);
  const [profil, setProfil] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };

    axios
      .get(url.user + "/" + uid, config)
      .then((res) => setUser(res.data.user[0]))
      .catch((error) => console.log(error));

    axios
      .get(url.profil + "/" + uid, config)
      .then((res) => setProfil(res.data.profil))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="profil-container">
      <h1>{user.pseudo}</h1>
      <UploadImg uid={uid} auth={auth} />
      <PublicInfos
        uid={uid}
        profil={profil}
        setProfil={setProfil}
        user={user}
        auth={auth}
      />
      <PersoInfos uid={uid} user={user} setUser={setUser} auth={auth} />
      <SupprProfil />
    </div>
  );
};

export default ProfilContainer;
