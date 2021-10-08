import React from "react";
const pseudo = sessionStorage.getItem("pseudo");

const Session = () => {
  return (
    <footer>
      <div className="session">{pseudo}</div>
    </footer>
  );
};

export default Session;
