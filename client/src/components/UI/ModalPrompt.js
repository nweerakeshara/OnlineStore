import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

export default function ModalPrompt({ id, name, price }) {
  const [modal, setModal] = useState(false);
  const [cart, setCart] = useContext(CartContext);

  const toggle = () => setModal(!modal);

  //Handle add to cart click
  const addToCart = () => {
    const product = {
      name: name,
      price: price,
      id: id,
    };
    setCart((currentCart) => [...currentCart, product]);
    toggle();
  };

  return (
    <div>
      <Button className="btn btn-warning text-light btn-block" onClick={toggle}>
        {`Add to cart`}
      </Button>
      <Modal size="sm" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Cart</ModalHeader>

        <ModalBody>
          <p>Are you sure you want add item to cart?</p>
          <p>{`${id} ${name} ${price}`}</p>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Continue Shopping
          </Button>

          <Button color="primary" onClick={addToCart}>
            Add to Cart
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
