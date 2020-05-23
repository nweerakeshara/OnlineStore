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

//this component is used to view products inside wishlist
export default function WishListView({ usr_id }) {
  const [wishlist, setWishList] = useState([]); //react hooks

  //fires this function everytime when the component is mounted
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/wishlist/get/${usr_id}`) //retrieving data from the database
      .then((res) => {
        setWishList(res.data);
      });
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //function to delete an item
  const deleteItem = (e) => {
    axios
      .delete(
        `http://localhost:5000/api/wishlist/delete/${e.target.value}/${usr_id}`
      )
      .then((res) => {
        NotificationManager.info("Item is Successfully deleted", "", 2000);
      })
      .catch((err) => console.log("Error"));
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        class="btn btn-success"
        style={{ marginLeft: "20px", border: "2px solid black" }}
      >
        Wish List
      </button>
      <NotificationContainer />
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Wish List</ModalHeader>
        {wishlist.length === 0 ? (
          <ModalBody>
            <p>You haven’t added any items to your Wish List yet</p>
            <Spinner color="success" />
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
                        height="110px"
                        width="130px"
                        src={`/uploads/${item.img_ID}`}
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
          <Button color="warning" onClick={toggle}>
            Shop Now
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
