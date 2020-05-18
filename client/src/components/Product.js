import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Product(props) {
  const [cart, setCart] = useContext(CartContext);

  //Handle add to cart click
  const addToCart = () => {
    const product = {
      name: props.name,
      price: props.price,
      id: props.id,
    };
    setCart((currentCart) => [...currentCart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <h2>{props.name}</h2>
      <h4>{props.price}</h4>
      <button onClick={addToCart}>Add To Cart</button>
      <hr></hr>
    </div>
  );
}
