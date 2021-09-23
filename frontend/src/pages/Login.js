import React, { useState } from "react";
import Logo from "../components/Logo";
import InscriptionForm from "../components/InscriptionForm";
import ConnexionForm from "../components/ConnexionForm";

const Login = () => {
  const [inscriptionModel, setInscriptionModel] = useState(false);
  const [connexionModel, setConnexionModel] = useState(true);

  const GestionModels = (e) => {
    if (e.target.id === "signup") {
      setConnexionModel(false);
      setInscriptionModel(true);
    } else if (e.target.id === "signin") {
      setConnexionModel(true);
      setInscriptionModel(false);
    }
  };

  return (
    <div className="page">
      <header>
        <Logo />
      </header>
      <main>
        <div className="login-container">
          <h1>Authentification</h1>
          <div className="selectLog">
            <button
              onClick={GestionModels}
              id="signup"
              className={inscriptionModel ? "activ-btn" : null}
            >
              S'inscrire
            </button>
            <button
              onClick={GestionModels}
              id="signin"
              className={connexionModel ? "activ-btn" : null}
            >
              Se connecter
            </button>
          </div>
          {inscriptionModel && <InscriptionForm />}
          {connexionModel && <ConnexionForm />}
        </div>
      </main>
    </div>
  );
};

export default Login;
