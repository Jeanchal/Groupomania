import React from "react";
const pseudo = sessionStorage.getItem("pseudo");

const Session = () => {
  return <div className="session">{pseudo}</div>;
};

export default Session;
