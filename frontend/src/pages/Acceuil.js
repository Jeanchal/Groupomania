import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import CreatePosts from "../components/Posts/CreatePosts";
import GetPosts from "../components/Posts/GetPosts";

const Acceuil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <div className="acceuil-container">
          <CreatePosts />
          <GetPosts />
        </div>
      </main>
    </div>
  );
};

export default Acceuil;
