import React, { useState } from "react";
import axios from "axios";
import url from "../../general/url";

const PublicInfos = ({ uid, profil, setProfil, user, auth }) => {
  const [fonction, setFonction] = useState("...");
  const [bio, setBio] = useState("...");
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

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
        .then((res) => {
          setProfil(res.data.profil[0]);
          console.log(res.data.profil);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="infos-container">
      <h3>Informations Publiques</h3>
      <form action="" onSubmit={savePublicInfos}>
        <div className="profilGrid">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            disabled="disabled"
            defaultValue={user.pseudo}
          />
          <label htmlFor="fonction">Poste Actuel</label>
          <input
            type="text"
            name="fonction"
            id="fonction"
            onChange={(e) => setFonction(e.target.value)}
            defaultValue={profil.fonction}
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            type="text"
            name="bio"
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            defaultValue={profil.bio}
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
