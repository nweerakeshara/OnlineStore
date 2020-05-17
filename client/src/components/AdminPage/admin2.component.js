import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Guest from "../GuestPage/guest.component";
import User from "../UserPage/user.component";
import FullTable from "../StoreManagerPage/fullTable.component";
import AddProduct from "../StoreManagerPage/addProduct.component";
import EditProduct from "../StoreManagerPage/editProduct.component";
import ButtonRow from "./buttonrow.component";

export default class Admin2 extends Component{
    render(){
        return(
            <div>
                <ButtonRow></ButtonRow>
            </div>
        )
    }
}
