import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Guest from "../GuestPage/guest.component";
import User from "../UserPage/user.component";
import FullTable from "../StoreManagerPage/fullTable.component";
import AddProduct from "../StoreManagerPage/addProduct.component";
import EditProduct from "../StoreManagerPage/editProduct.component";

export default class Admin2 extends Component{
    render(){
        return(
            <div>
                <h3 align="center"> This is Admin page </h3>
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
                </div>
            </div>
        )
    }
}
