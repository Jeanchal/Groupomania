import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Posts from "../components/Posts/Posts";

const Acceuil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
};

export default Acceuil;
