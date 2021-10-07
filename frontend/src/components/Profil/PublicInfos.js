import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../general/url";
const uid = sessionStorage.getItem("uid");
const token = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const PublicInfos = () => {
  const [data, setData] = useState([]);
  const [fonction, setFonction] = useState("...");
  const [bio, setBio] = useState("...");

  useEffect(() => {
    axios
      .get(url.profil + "/" + uid, config)
      .then((res) => setData(res.data.profil))
      .catch((error) => console.log(error));
  }, []);

  function savePublicInfos(e) {
    e.preventDefault();
    const reponse = window.confirm(
      "Souhaitez-vous vraiment modifier ces informations ?"
    );
    if (reponse === true) {
      let objet = {
        fonction: fonction,
        bio: bio,
      };
      axios
        .put(url.profil + "/" + uid, objet, config)
        .then((res) => setData(res.data.profil[0]))
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="infos-container">
      <h3>Informations publiques</h3>
      <form action="" onSubmit={savePublicInfos}>
        <div className="profilGrid">
          <label htmlFor="fonction">Poste Actuel</label>
          <input
            type="text"
            name="fonction"
            id="fonction"
            onChange={(e) => setFonction(e.target.value)}
            defaultValue={data.fonction}
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            type="text"
            name="bio"
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            defaultValue={data.bio}
          ></textarea>
        </div>
        <div className="submit-infos">
          <input type="submit" value="Modifier" />
        </div>
      </form>
    </div>
  );
};

export default PublicInfos;
