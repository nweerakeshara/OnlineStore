import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

export default function WishListView({ buttonLabel }) {
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/wishlist/get").then((res) => {
      setWishList(res.data);
    });
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

 const deleteItem = () => {

  }

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        class="btn btn-outline-secondary"
      >{`${buttonLabel}`}</button>

      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Wish List</ModalHeader>
        {wishlist.length === 0 ? (
          <ModalBody>
            <p>No Items in Wish List</p>
          </ModalBody>
        ) : (
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              {wishlist.map((item) => (
                <tbody>
                  <tr>
                    <th scope="row">{item.product_id}</th>
                    <td>{item.product_name}</td>
                    <td>{item.product_price}</td>
                    <td><button onClick ={deleteItem} type="button" class="btn btn-danger">Delete</button></td>
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
