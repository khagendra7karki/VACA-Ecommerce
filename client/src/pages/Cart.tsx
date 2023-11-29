import React, { useEffect, useRef, useState } from "react";
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
  Container,
  Grid,
  Divider,
  TextInput,
  Title,
} from "@mantine/core";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiTrashAlt } from "react-icons/bi";

const Cart = () => {
  const numRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { cartItems } = useSelector((state: State) => state.cart);

  const { getCart, removeFromCart, updateCart } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handlerUpdateCartItems = (value: number, id: string) => {
    updateCart(id, value);
  };

  const selectItem = (id: string) => {
    setOpened(true);
    setSelectedItem(id);
  };

  const handlerDeleteCartItem = (id: string) => {
    setOpened(false);
    console.log(id);
    removeFromCart(id);
  };

  useEffect( () =>{
    getCart()
  }, [])

  return (
    <>
      <Container size="80%" mb = {50}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>Product</Grid.Col>
          <Grid.Col span={2}>Price</Grid.Col>
          <Grid.Col span={2}>Quantity</Grid.Col>
          <Grid.Col span={3}>SubTotal</Grid.Col>
        </Grid>
        <Divider mb={30} />
        {cartItems && cartItems.length ? (
          cartItems.map((item: any, index: number) => {
            return (
              <div key = {index}>
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
                <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }} my={20}>
                  <Grid.Col span={5}>
                    <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
                      <Grid.Col span={3}>
                        {" "}
                        <Button
                          size="sm"
                          px={0}
                          mt={10}
                          radius="md"
                          variant="subtle"
                          color="#DB4444"
                          onClick={() => selectItem(item.product)}
                        >
                        <BiTrashAlt size={15} style ={{margin:"auto"}} />
                        </Button> 
              
                      </Grid.Col>
                      <Grid.Col span={3}>
                        {" "}
                        <Image
                          fit="contain"
                          radius="lg"
                          height={50}
                          width={50}
                          src={item.image}
                        />
                      </Grid.Col>
                      <Grid.Col span={7}>{item.title}</Grid.Col>
                    </Grid>
                  </Grid.Col>
                  <Grid.Col span={2}> Rs. {item.price}</Grid.Col>
                  <Grid.Col span={2}>
                    <NumberInput
                      style = {{maxWidth: '70px'}}
                      radius="sm"
                      value={item.quantity}
                      ref={numRef}
                      onChange={(e) => {
                        handlerUpdateCartItems(e as number, item.product);
                      }}
                      min={1}
                      //max={item.countInStock}
                      max={5}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>Rs. {item.price * item.quantity}</Grid.Col>
                </Grid>
              </div>
            );
          })
        ) : (
          <>
            {" "}
            <Alert
              icon={<RiShoppingBagLine size={16} />}
              style={{ marginTop: "1rem" }}
              color="blue"
              radius="lg"
            >
              No items in the cart
            </Alert>
          </>
        )}
        <Divider mb={20} />
        <Grid>
          <Grid.Col span={6}>
            <Button size="md" variant="default">
              Return To shop
            </Button>
          </Grid.Col>
          <Grid.Col
            span={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button size="md" variant="default">
              Update Cart
            </Button>
          </Grid.Col>
        </Grid>

        <Grid mt = {50}>
          <Grid.Col span={8}>
            <Grid>
              <Grid.Col span={6}>
                {" "}
                <TextInput placeholder="Coupon Code" />
              </Grid.Col>
              <Grid.Col span={6}>
                <Button size="md" variant="default">
                  Apply Coupon
                </Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col
            span={4}
            // style={{ display: "flex", justifyContent: "flex-end" }}
          >
             <div className="subtotal-container">
          <Card radius="lg" shadow="xl" withBorder>
          <Title order={3}>Cart Total</Title>
          <Grid>
            <Grid.Col span = {6}> <Text>
              Total Quantity 
            </Text></Grid.Col>
            <Grid.Col span = {6} ><Text ta="right">
              {cartItems.reduce(
                (acc: any, item: any) => acc + item.quantity,
                0
              )}
                 &nbsp; Items</Text></Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span = {6}> <Text>
              Subtotal 
            </Text></Grid.Col>
            <Grid.Col span = {6} >
            <Text size="md" ta = 'right' style={{ marginTop: ".5rem" }}>
              Rs.
              {cartItems
                .reduce(
                  (acc: any, item: any) => acc + item.quantity * item.price,
                  0
                )
                .toFixed(2)}
            </Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span = {6}> <Text>
              Shipping 
            </Text></Grid.Col>
            <Grid.Col span = {6} >
            <Text size="md" ta = 'right' style={{ marginTop: ".5rem" }}>
              0
            </Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span = {6}> <Text>
              Total 
            </Text></Grid.Col>
            <Grid.Col span = {6} >
            <Text size="md" ta = 'right' style={{ marginTop: ".5rem" }}>
              Rs. {cartItems
                .reduce(
                  (acc: any, item: any) => acc + item.quantity * item.price,
                  0
                )
                .toFixed(2)} 
            </Text>
            </Grid.Col>
          </Grid>
           
            
            
            {cartItems && cartItems.length ? (
              <Button
                style={{ marginTop: ".5rem" }}
                color="#DB4444"
                size="md"
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
          </Grid.Col>
        </Grid>
       
      </Container>
         </>
  );
};

export default Cart;
