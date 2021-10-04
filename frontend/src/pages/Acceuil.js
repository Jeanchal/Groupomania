import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import CreatePosts from "../components/Posts/CreatePosts";

const Acceuil = () => {
  return (
    <div className="page">
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <CreatePosts />
      </main>
    </div>
  );
};

export default Acceuil;
