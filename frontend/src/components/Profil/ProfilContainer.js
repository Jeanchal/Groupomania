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
  const [uid] = useState("69ff7650-79f9-11ec-be24-8d965e725f7c");
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
      <UploadImg uid={uid} auth={auth} profil={profil} />
      <PublicInfos
        uid={uid}
        profil={profil}
        setProfil={setProfil}
        user={user}
        auth={auth}
      />
      {auth.uid === uid ? (
        <PersoInfos uid={uid} user={user} setUser={setUser} auth={auth} />
      ) : null}
      {auth.uid === uid ? <SupprProfil /> : null}
    </div>
  );
};

export default ProfilContainer;
