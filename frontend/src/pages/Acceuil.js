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
      <Session />
    </div>
  );
};

export default Acceuil;
