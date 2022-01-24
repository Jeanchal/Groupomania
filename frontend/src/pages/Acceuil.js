import Authentification from "../components/Authentification";
import BtnRemonter from "../components/BtnRemonter";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import PostContainer from "../components/Posts/PostContainer";
import Session from "../components/Session";

const Acceuil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <PostContainer />
      </main>
      <br />
      <BtnRemonter />
      <Authentification />
      <Session />
    </div>
  );
};

export default Acceuil;
