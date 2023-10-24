import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Modal,
  Button,
  Card,
  Image,
  NumberInput,
  Alert,
} from "@mantine/core";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiTrashAlt } from "react-icons/bi";
import Layout from "../Layout/Layout";

const Cart = () => {
  const numRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { cartItems } = useSelector((state: State) => state.cart);

  const { addToCart, removeFromCart } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handlerUpdateCartItems = (value: number, id: string) => {
    dispatch(addToCart(id, value));
  };

  const selectItem = (id: string) => {
    setOpened(true);
    setSelectedItem(id);
  };

  const handlerDeleteCartItem = (id: string) => {
    setOpened(false);
    dispatch(removeFromCart(id));
  };

  return (
   <Layout>

<div className="cart-container">
  <Modal
    title="Delete Item?"
    size="lg"
    onClose={() => setOpened(false)}
    opened={opened}
  >
    <Text size="sm">
      Are you sure that you want to remove this item?
    </Text>
    <div className="button-container">
      <Button
        onClick={() => setOpened(false)}
        color="gray"
        size="lg"
        fullWidth
      >
        Cancel
      </Button>
      <Button
        onClick={() => handlerDeleteCartItem(selectedItem)}
        color="red"
        size="lg"
        fullWidth
      >
        Yes
      </Button>
    </div>
  </Modal>
  <div className="grid-container">
    {cartItems && cartItems.length ? (
      cartItems.map((item: any, index : number) => {
        return (
          <Card className="cart-card" key={index}>
            <div className="grid-item">
              <Image
                fit="contain"
                radius="lg"
                height={50}
                width={50}
                src={item.image}
              />
            </div>
            <div className="grid-item">
              <div className="item-name">
                {item.title}
              </div>
            </div>
            <div className="grid-item">
              <div className="item-price">
                ${item.price} 
                {/* x {item.qty} */}
              </div>
            </div>
            <div className="grid-item">
              <NumberInput
                radius="lg"
                //value={item.qty}
                value={1}
                ref={numRef}
                onChange={(e) =>
                  handlerUpdateCartItems(e as number, item.product)
                }
                min={1}
                //max={item.countInStock}
                max={5}
                required
              />
            </div>
            <div className="grid-item">
              <Button
                size="sm"
                radius="lg"
                variant="filled"
                color="red"
                onClick={() => selectItem(item.product)}
                fullWidth
              >
                <BiTrashAlt />
              </Button>
            </div>
          </Card>
        );
      })
    ) : (
      <Alert
        icon={<RiShoppingBagLine size={16} />}
        style={{ marginTop: "1rem" }}
        color="blue"
        radius="lg"
      >
        No items in the cart
      </Alert>
    )}
  </div>
  <div className="subtotal-container">
    <Card radius="lg" shadow="xl" withBorder>
      <Text style={{ marginBottom: "1rem" }}>
        Subtotal 
        {/* {cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)} */}
        {cartItems.reduce((acc: any, item: any) => acc + 1, 0)}
        Items
      </Text>
      <Text size="xl" style={{ marginTop: ".5rem" }}>
        $
        {cartItems
          // .reduce((acc: any, item: any) => acc + item.qty * item.price, 0)
          .reduce((acc: any, item: any) => acc + 1 * item.price, 0)
          .toFixed(2)}
      </Text>
      {cartItems && cartItems.length ? (
        <Button
          style={{ marginTop: ".5rem" }}
          color="dark"
          size="lg"
          fullWidth
          onClick={() => navigate("/shipping")}
        >
          Proceed to Checkout
        </Button>
      ) : (
        <></>
      )}
    </Card>
  </div>
</div>

</Layout>

  );
};

export default Cart;


// import React from 'react'

// function Cart() {
//   return (
//     <div>Cart</div>
//   )
// }

// export default Cart