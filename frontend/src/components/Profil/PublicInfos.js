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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const modifPublicInfos = () => {};

  return (
    <div className="infos-container">
      <h3>Informations publiques</h3>
      <form action="">
        <div className="profilGrid">
          <label htmlFor="fonction">Poste Actuel</label>
          <input
            type="text"
            name="fonction"
            id="fonction"
            placeholder={data.fonction}
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            type="text"
            name="bio"
            id="bio"
            placeholder={data.bio}
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
