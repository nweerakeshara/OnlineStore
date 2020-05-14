import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import StoreManager from "./components/storemanager.component";
import Edit from "./components/edit.component";
import Admin from "./components/admin.component";
import Guest from "./components/guest.component";
import User from "./components/user.component";
import { CartProvider } from "./components/CartContext";

class App extends Component {
  render() {
    return (
      <Router>
        <CartProvider>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={"/"} className="navbar-brand">
                {" "}
                Online Fashion Store{" "}
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/guest"} className="nav-link">
                      Guest
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/storemanager"} className="nav-link">
                      Store Manager
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br />

            {/*<h2>Welcome to REACT CRUD by Haritha</h2><br/>*/}

            <Switch>
              <Route exact path="/guest" component={Guest} />
              <Route exact path="/user" component={User} />
              <Route exact path="/storemanager" component={StoreManager} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/edit/:id" component={Edit} />
            </Switch>
          </div>
        </CartProvider>
      </Router>
    );
  }
}

export default App;
