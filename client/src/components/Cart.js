import React, { useContext, useState } from "react";
import Product from "../components/Product";
import { CartContext } from "./CartContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function Cart({ buttonLabel }) {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      {/* <p>Items in Cart: {cart.length}</p>
      <p>Total Price: {totalPrice.toPrecision(4)} </p> */}
      <Button color="danger" onClick={toggle}>
        {`${buttonLabel} ${cart.length}`}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Shopping Cart</ModalHeader>
        <ModalBody>
          {cart.map((item) => (
            <Product
              name={item.name}
              price={item.price}
              id={item.id}
              key={item.id}
            ></Product>
          ))}
          <p>Total Price: {totalPrice.toPrecision(4)}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
