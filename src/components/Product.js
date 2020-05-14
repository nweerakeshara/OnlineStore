import React from "react";

export default function Product(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <h4>{props.price}</h4>
      <button>Add To Cart</button>
      <hr></hr>
    </div>
  );
}
