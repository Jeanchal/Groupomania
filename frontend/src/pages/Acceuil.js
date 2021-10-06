import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import PostContainer from "../components/Posts/PostContainer";

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
    </div>
  );
};

export default Acceuil;
