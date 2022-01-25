import Acceuil from "./pages/Acceuil";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/acceuil" exact component={Acceuil} />
        <Route path="/profil" exact component={Profil} />
        <Redirect to="/acceuil" />
      </Switch>
    </Router>
  );
}

export default App;
