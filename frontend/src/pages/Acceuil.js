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
          <h1>Acceuil</h1>
          <br />
          <div className="posts-container">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              error rerum dicta, non reiciendis totam provident dignissimos
              laudantium earum dolore iusto. Corporis esse maxime recusandae ad
              repellat. Ipsa, laboriosam. Ea expedita tempora fuga, in veniam
              animi, vitae placeat numquam quasi reiciendis cum earum temporibus
              commodi est odit minima exercitationem totam unde autem. Facere
              est culpa, fugit ex iste quisquam aliquam temporibus veniam
              incidunt. Voluptatem, mollitia ea vitae adipisci ipsa perferendis
              maiores earum sint autem nam alias, consequuntur laborum cumque
              nostrum nobis fugiat enim odio eligendi dolore rerum accusantium
              labore asperiores. Recusandae tenetur sapiente tempore est, enim
              hic consequatur mollitia eaque quisquam consectetur adipisci
              consequuntur animi impedit quos eum, possimus vel velit! Tempora,
              beatae recusandae. Facilis distinctio explicabo aperiam quae
              veniam architecto? Praesentium sunt, iusto maiores iure aliquam
              tempora aperiam at laboriosam unde consequuntur labore adipisci
              asperiores necessitatibus ut porro iste!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Acceuil;
