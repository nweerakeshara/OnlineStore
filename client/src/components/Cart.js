import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div>
      <p>Items in Cart: {cart.length}</p>
      <p>Total Price: {totalPrice.toPrecision(4)} </p>
    </div>
  );
}
