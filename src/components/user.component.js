import React, { Component } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

export default class User extends Component {
  render() {
    return (
      <div>
        <h3 align="center"> This is User page </h3>
        <Cart />
        <ProductList />
      </div>
    );
  }
}
