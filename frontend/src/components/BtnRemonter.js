import React, { useState } from "react";

const BtnRemonter = () => {
  const [scrollPosition, setScrollPosition] = useState(false);

  window.addEventListener("scroll", () => {
    window.scrollY > 100 ? setScrollPosition(true) : setScrollPosition(false);
  });

  function remonter() {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      {scrollPosition === true ? (
        <div id="btnRemonter" onClick={remonter}>
          <i className="fas fa-caret-square-up"></i>
        </div>
      ) : null}
    </div>
  );
};

export default BtnRemonter;
