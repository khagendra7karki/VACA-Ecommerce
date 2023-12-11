import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
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
  Group,
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
  const { isLoggedIn } = useSelector((state: State) => state.userLogin);


  const { getCart, removeFromCart, updateCart, clearCart } = bindActionCreators(
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

  useEffect( () =>{
    if( !isLoggedIn ) clearCart()
    
  }, [ isLoggedIn ])

  return (
    <>
    <Group hiddenFrom="sm" mb={10}><Text size="xl">Cart</Text></Group>
      <Container size="80%" mb = {50}  >
        <Grid visibleFrom="sm"  gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}><Group justify="center">Product</Group></Grid.Col>
          <Grid.Col span={2}><Group justify="center">Price</Group></Grid.Col>
          <Grid.Col span={2}><Group justify="center">Quantity</Group></Grid.Col>
          <Grid.Col span={3}><Group justify="center">SubTotal</Group></Grid.Col>
        </Grid>
        <Divider mb={30} visibleFrom="sm" />
        {cartItems && cartItems.length ? (
          cartItems.map((item: any, index: number) => {
            return (
              <div key = {index} >
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
                <Container fluid h='100%' mb={10}>
     
   
                <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }} my={20}>
                  <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
                    <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
                      <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                        {" "}
                        <Group justify="center"><Button
                          size="sm"
                          px={0}
                          mt={10}
                          radius="md"
                          variant="subtle"
                          color="#DB4444"
                          onClick={() => selectItem(item.product._id)}
                        >
                        <BiTrashAlt size={15} style ={{margin:"auto"}} />
                        </Button> </Group>
                        
              
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                        {" "}
                        <Group justify="center"> 
                          <Image
                            fit="contain"
                            radius="sm"
                            height={60}
                            width={60}
                            src={item.image}
                          />
                        </Group>
                       
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6, lg: 7 }}>
                      <Group justify="center">{item.title} </Group></Grid.Col>
                    </Grid>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                  <Group justify="center">Rs. {item.price}</Group>
                     </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                  <Group justify="center"> <NumberInput
                      style = {{maxWidth: '70px'}}
                      radius="sm"
                      value={item.quantity}
                      ref={numRef}
                      onChange={(e) => {
                        handlerUpdateCartItems(e as number, item.product._id);
                      }}
                      min={1}
                      //max={item.countInStock}
                      max={item.product.availableQuantity}
                      required
                    /></Group>
                   
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                  <Group justify="center">  Rs. {item.price * item.quantity}</Group>
                   </Grid.Col>
                </Grid> </Container>
              </div>
            );
          })
        ) : (
          <>
            {" "}
            <Alert
              icon={<RiShoppingBagLine size={16} />}
              style={{ marginTop: "1rem", background: 'white' }}
              radius="lg"
            >
              No items in the cart
            </Alert>
          </>
        )}
        <Divider mb={20} />
        <Grid>
          <Grid.Col span={{ base: 7, md: 6, lg: 6 }}>
            <Button size="sm" variant="default">
              Return To shop
            </Button>
          </Grid.Col>
          <Grid.Col
            span={{ base: 5, md: 6, lg: 6 }}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button size="sm" variant="default">
              Update Cart
            </Button>
          </Grid.Col>
        </Grid>

        <Grid mt = {50}>
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                {" "}
                <TextInput placeholder="Coupon Code" />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                <Button size="md" variant="default">
                  Apply Coupon
                </Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col
            span={{ base: 12, md: 6, lg: 4 }}
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
                onClick={() => navigate("/checkout")}
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
