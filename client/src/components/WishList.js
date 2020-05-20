import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default function WishList({ name, price, id }) {
  const addToWishList = (e) => {
    const product = {
      product_name: name,
      product_price: price,
      product_id: id,
    };

    axios
      .post("http://localhost:5000/api/wishlist/add", product)
      .then((res) => {
        if (res.data.success == true) {
          NotificationManager.success('Item Added to the Wish List', '');
          console.log(res.data);
        } else {
          NotificationManager.error('Item is already in the Wish List', 'Click Here!', 10000, () => {
              alert('Visit Wish List')
          });

          console.log(res.data);
        }
      })
      .catch((error) => {
        NotificationManager.error('Item is already in the Wish List', 'Click Here!', 10000, () => {
          alert('Visit Wish List')
        });
      });
  };

  return (
    <div>
      <button onClick={addToWishList} type="button" class="btn btn-secondary">
        Add to Wish List
      </button>
      <NotificationContainer/>
    </div>
  );
}
