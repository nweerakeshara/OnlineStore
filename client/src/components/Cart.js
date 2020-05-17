import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

export default function Cart({ buttonLabel }) {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        style={{ float: "right", margin: "20px" }}
        color="danger"
        onClick={toggle}
      >
        {`${buttonLabel} ${cart.length}`}
      </Button>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Shopping Cart</ModalHeader>
        {cart.length === 0 ? (
          <ModalBody>
            <p>No Items in Cart</p>
          </ModalBody>
        ) : (
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Price</th>
                </tr>
              </thead>
              {cart.map((item) => (
                <tbody>
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
            <p>Total Price: {totalPrice.toPrecision(4)}</p>
          </ModalBody>
        )}

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Continue Shopping
          </Button>
          {cart.length !== 0 ? (
            <Button color="primary" onClick={toggle}>
              Checkout
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    </div>
  );
}
