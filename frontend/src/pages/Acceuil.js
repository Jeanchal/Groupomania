import React from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Acceuil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <div className="acceuil-container">
          {/* <h1>Acceuil</h1> */}
          <br />
          <div className="posts-container">
            <form>
              <textarea
                type="text"
                placeholder="Quoi de neuf ?"
                className="post"
              />
              <div>
                <input type="submit" value="Publier" className="submitPost" />
                <i className="fas fa-image" title="ajouter une image"></i>
                <input
                  type="file"
                  className="imagePost"
                  title="ajouter une image"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Acceuil;
