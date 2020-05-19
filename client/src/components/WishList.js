import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WishList({ name, price, id }) {
  const [wishList, setWishList] = useState([]);

  const addToWishList = (e) => {
    const product = {
      product_name: name,
      product_price: price,
      product_id: id,
    };

    axios
      .post("http://localhost:5000/api/wishlist/add", product)
      .then((res) => {
        alert("successfully added");
        console.log(res.data);
      })
      .catch((res) => {
        alert("Item is already in the wishlist");
      });
  };

  return (
    <div>
      <button onClick={addToWishList} type="button" class="btn btn-secondary">
        Add to Wish List
      </button>
    </div>
  );
}
