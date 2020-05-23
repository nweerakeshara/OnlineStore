import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Spinner } from "reactstrap";

export default function WishListView({ usr_id }) {
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/wishlist/get/${usr_id}`)
      .then((res) => {
        setWishList(res.data);
        console.log(res.data);
        
      });
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const deleteItem = (e) => {
    axios
      .delete(
        `http://localhost:5000/api/wishlist/delete/${e.target.value}/${usr_id}`
      )
      .then((res) => {
        NotificationManager.info("Item Successfully deleted", "", 2000);
        console.log(res.data);
      })
      .catch((err) => console.log("Error"));
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        class="btn btn-outline-secondary"
        style={{ marginLeft: "20px" }}
      >
        Wish List
      </button>
      <NotificationContainer />
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Wish List</ModalHeader>
        {wishlist.length === 0 ? (
          <ModalBody>
            <p>No Items in Wish List</p>
            <Spinner color="danger" />
          </ModalBody>
        ) : (
          <ModalBody>
            <Table dark striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              {wishlist.map((item) => (
                <tbody key={item.product_id}>
                  <tr>
                    <th scope="row">                     
                      <img
                        height="30%"
                        width="30%"
                        //src={`/uploads/${item.imageData}`}
                        src={`${item.img_ID}`}
                      />
                      
                    </th>
                    
                    <td>{item.product_name}</td>
                    <td>{item.product_price}</td>

                    <td>
                      <button
                        value={item.product_id}
                        onClick={deleteItem}
                        type="button"
                        class="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </ModalBody>
        )}

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Continue Shopping
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
