import Acceuil from "./pages/Acceuil";
import Profil from "./pages/Profil";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/acceuil" exact component={Acceuil} />
        <Route path="/profil" exact component={Profil} />
        <Redirect to="/acceuil" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
