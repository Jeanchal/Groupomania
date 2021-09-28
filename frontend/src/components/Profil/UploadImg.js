import axios from "axios";
import React, { useState } from "react";

const UploadImg = () => {
  const [file, setFile] = useState();
  const pseudo = sessionStorage.getItem("pseudo");
  const userId = sessionStorage.getItem("userId");

  const gestionImage = () => {
    e.preventDefault();
    const data = new FormData();
    data.append("pseudo", pseudo);
    data.append("userId", userId);
    data.append("file", file);

    axios.post("http://localhost:4000/api/profil", data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <form action="" onSubmit={gestionImage} className="uploadImg">
      <label htmlFor="file">Modifier image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
