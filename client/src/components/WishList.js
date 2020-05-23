import React, { useEffect, useState } from "react";
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
import { Spinner } from 'reactstrap';

export default function WishList({ name, price, id, usr_id }) {

  //add wishlist items to DB
  const addToWishList = (e) => {
    const product = {
      product_name: name,
      product_price: price,
      product_id: id,
      user_ID : usr_id
    };

    

    axios
      .post("http://localhost:5000/api/wishlist/add", product)
      .then((res) => {
        if (res.data.success == true) {
          NotificationManager.success("Click Here to view the Wish List", "Item Added to the Wish List",10000,()=>{
            toggle();
          });
          console.log(res.data);
        } else {
          NotificationManager.error(
            "",
            "Item is already in the Wish List",
            10000,
            () => {
              toggle()
            }
          );

          console.log(res.data);
        }
      })
      .catch((error) => {
        NotificationManager.error(
          "Click Here to view the Wish List!",
          "Item is already in the Wish List",
          10000,
          () => {
            toggle();
          }
        );
      });
  };

  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/wishlist/get/${usr_id}`).then((res) => {
      setWishList(res.data);
    });
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //deleting an item from the wish list
  const deleteItem = (e) => {

    axios
      .delete(`http://localhost:5000/api/wishlist/delete/${e.target.value}/${usr_id}`)
      .then((res) => {
        NotificationManager.info('Item Successfully deleted',"",2000);
        console.log(res.data);
      })
      .catch((err) => console.log("Error"));
  };

  return (
    <div>
      <button onClick={addToWishList} type="button" className="btn btn-info ">
        Add to Wish List
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
                  <th>#</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              {wishlist.map((item) => (
                <tbody key={item.product_id}>
                  <tr>
                    <th scope="row">{item.product_id}</th>
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
