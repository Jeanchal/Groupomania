import React, { useEffect } from "react";
import axios from "axios";
import url from "../general/url";
const token = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const Authentification = () => {
  function redirect() {
    alert("Merci de vous connecter avant de poursuivre...");
    window.location = "/";
  }

  useEffect(() => {
    token === null
      ? redirect()
      : axios.get(url.user, config).catch(() => redirect());
  }, []);

  return <div></div>;
};

export default Authentification;
