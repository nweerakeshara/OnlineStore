import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AboutComponent from "./customer_components/about.component";
import RegisterCustomer from "./customer_components/register.component";
import EditCustomer from "./customer_components/edit.component";
import LoginCustomer from "./customer_components/login.component";
import { CartProvider } from "./components/CartContext";
import Guest from "./components/GuestPage/guest.component";
import User from "./components/UserPage/user.component";
import AddProduct from "./components/StoreManagerPage/addProduct.component";
import FullTable from "./components/StoreManagerPage/fullTable.component";
import Admin2 from "./components/AdminPage/admin2.component";
import EditProduct from "./components/StoreManagerPage/editProduct.component";
import AddStoreManager from "./components/AdminPage/addStoreManager.component";
import Carousel from "./components/UI/Carousel";

function App() {
  return (
    <div>
      <Router>
        <CartProvider>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={"/"} className="navbar-brand">
                Online Fashion Store
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      Home
                    </Link>
                  </li>

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

                  <li className="nav-item">
                    <Link to={"/registerCus"} className="nav-link">
                      Customer Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/loginCus"} className="nav-link">
                      Customer Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/editCus"} className="nav-link">
                      {" "}
                      Customer Edit
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br />
            <h2>Welcome To HINT - Fashion For You</h2>

            <Switch>
              <Route exact path="/registerCus" component={RegisterCustomer} />
              <Route exact path="/loginCus" component={LoginCustomer} />
              <Route exact path="/editCus" component={EditCustomer} />

              <Route exact path="/guest" component={Guest} />
              <Route exact path="/user" component={User} />
              <Route exact path="/storemanager" component={FullTable} />
              <Route exact path="/addProduct" component={AddProduct} />
              <Route exact path="/admin" component={Admin2} />
              <Route exact path="/edit/:id" component={EditProduct} />
              <Route
                exact
                path="/addStoreManager"
                component={AddStoreManager}
              />
            </Switch>
          </div>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
