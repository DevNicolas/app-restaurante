import React, { useEffect, useState } from "react";
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { BsHouseDoor } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import Login from "./login/Index";
import Informe from "./informe/Index";
import Menu from "./Menu/Index";
import Home from "./Home/Index";
import { isAuth } from "../utils/globalVariables";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    if (isAuth()) {
      setIsloggedIn(isAuth());
    }
  }, []);
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const redirectUser = () => {
    return <Redirect from="/" to="/login" />;
  };
  return (
    <div className="App">
      <Router>
        <div>
          {isLoggedIn ? (
            <nav className="side-nav">
              <Link to="/">
                <BsHouseDoor /> Inicio
              </Link>

              <Link to="/menu">
                <IoIosPeople />
                Menus
              </Link>

              <Link to="/informes">
                <BiTask />
                Informes
              </Link>
            </nav>
          ) : (
            redirectUser()
          )}
          <Switch>
            <Route
              path="/login"
              component={() => (
                <Login change={(isLoggedIn) => setIsloggedIn(isLoggedIn)} />
              )}
            />
            <Route path="/informes" component={Informe} />
            <Route path="/menu" component={Menu} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
