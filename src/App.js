import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import AddBusiness from './components/addBusiness.component';
import EditBusiness from './components/edit.component';
import ViewFullTable from './components/viewBusiness.component';
import Guest from "./components/GuestPage/guest.component";
import User from "./components/UserPage/user.component";
import AddProduct from "./components/StoreManagerPage/addProduct.component";
import FullTable from "./components/StoreManagerPage/fullTable.component";
import Admin2 from "./components/AdminPage/admin2.component";
import EditProduct from "./components/StoreManagerPage/editProduct.component";

class App extends Component{
    render(){
        return(
            <Router>

                <div className="container">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to={'/'} className="navbar-brand"> Online Fashion Store </Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/guest'} className="nav-link">Guest</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/user'} className="nav-link">User</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/storemanager'} className="nav-link">Store Manager</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/admin'} className="nav-link">Admin</Link>
                                </li>
                            </ul>
                        </div>
                    </nav><br/>

                    {/*<h2>Welcome to REACT CRUD by Haritha</h2><br/>*/}

                    <Switch>
                        <Route exact path = '/guest' component={Guest} />
                        <Route exact path = '/user' component={User} />
                        <Route exact path = '/storemanager' component = {FullTable} />
                        <Route exact path = '/addProduct' component = {AddProduct} />
                        <Route exact path = '/admin' component={Admin2} />
                        <Route exact path = '/edit/:id' component={EditProduct} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
