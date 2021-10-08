import React from "react";
const pseudo = sessionStorage.getItem("pseudo");

const Session = () => {
  return (
    <footer>
      <div className="session">
        <div>{pseudo}</div>
      </div>
    </footer>
  );
};

export default Session;
