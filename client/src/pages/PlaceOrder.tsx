import { Button, Card, Grid, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import Steps from "../components/Steps";

import { BsCreditCard2Front, BsBox } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators, State } from "../state";

import { bindActionCreators } from "redux";
import { useEffect } from "react";
import Layout from "../Layout/Layout";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createOrder } = bindActionCreators(actionCreators, dispatch);

  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state: State) => state.cart
  );

  const { orderCreate, loading: createOrderLoading } = useSelector(
    (state: State) => state.orderCreate
  );

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cartItems.itemsPrice = addDecimals(
    cartItems.reduce((acc: any, item: any) => acc + item.price * item.qty, 0)
  );
  cartItems.shippingPrice = addDecimals(cartItems.itemsPrice > 100 ? 0 : 100);
  cartItems.taxPrice = addDecimals(
    Number((0.15 * cartItems.itemsPrice).toFixed(2))
  );
  cartItems.totalPrice = (
    Number(cartItems.itemsPrice) +
    Number(cartItems.shippingPrice) +
    Number(cartItems.taxPrice)
  ).toFixed(2);

  const handlerOrderCreate = () => {
  
      createOrder(
        cartItems,
        shippingAddress,
        paymentMethod,
        cartItems.itemsPrice,
        cartItems.taxPrice,
        cartItems.shippingPrice,
        cartItems.totalPrice
      )
    
  };

  useEffect(() => {
    if (Object.keys(orderCreate).length) {
      console.log(orderCreate,"lllllllllllllllllllllllllllllllllll")
      navigate(`/order/${orderCreate._id}`);
    }
    // eslint-disable-next-line
  }, [createOrder]);

  return (
    <Layout>
      {/* <Head title="Place Order" /> */}
      <Card withBorder shadow="sm" radius="lg" padding="xl">
        <Steps active={3} />
        <Grid style={{ marginTop: "2rem" }}>
          <Grid.Col span={12}>
            <Text>Shipping Address</Text>
            <Grid>
              <Grid.Col span={12}>
                <Card
                  withBorder
                  shadow="xs"
                  radius="lg"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0",
                  }}
                >
                  <BsBox size="30" />
                  <Text
                    color="gray"
                    style={{ marginLeft: "10px" }}
                  //  weight={500}
                    size="sm"
                  >
                    {shippingAddress.address}, {shippingAddress.city}{" "}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text>Payment Method</Text>
            <Grid>
              <Grid.Col span={12}>
                <Card
                  withBorder
                  shadow="xs"
                  radius="lg"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0",
                  }}
                >
                  <BsCreditCard2Front size="30" />
                  <Text
                    style={{ marginLeft: "10px" }}
                    color="gray"
                   
                    size="sm"
                  >
                    {paymentMethod}
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col style={{ margin: "10px 0" }} span={12}>
            <Text>Order Items</Text>
            <Grid>
              <Grid.Col span={12}>
                {cartItems && cartItems.length ? (
                  cartItems.map((item: any) => {
                    return (
                      <Card
                        style={{ margin: "10px 0" }}
                        padding="sm"
                        withBorder
                        shadow="xs"
                        radius="lg"
                      >
                        <Grid>
                          <Grid.Col
                            style={{ display: "flex", alignItems: "center" }}
                            span={5}
                          >
                            <Image
                              radius="lg"
                              fit="contain"
                              height={40}
                              width={40}
                              src={item.image}
                            />
                          </Grid.Col>
                          <Grid.Col
                            style={{ display: "flex", alignItems: "center" }}
                            span={3}
                          >
                            <Text  style={{alignContent:"left"}} color="gray" >
                              {item.title}
                            </Text>
                          </Grid.Col>
                          <Grid.Col
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                            span={4}
                          >
                            <Text  style={{alignContent:"right"}} >
                              {item.qty} x ${item.price}
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Card>
                    );
                  })
                ) : (
                  <></>
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={12}>
            <Text style={{ margin: "10px 0" }}>Order Summary</Text>
            <Card withBorder shadow="xs" radius="lg">
              <Grid
                style={{ margin: "10px 0", borderBottom: "1px solid #E0E0E0" }}
              >
                <Grid.Col span={6}>
                  <Text>Price</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text  style={{alignContent:"right"}}>
                    ${" "}
                    {cartItems
                      .reduce(
                        (acc: any, item: any) => acc + item.qty * item.price,
                        0
                      )
                      .toFixed(2)}
                  </Text>
                </Grid.Col>
              </Grid>
              <Grid
                style={{ margin: "10px 0", borderBottom: "1px solid #E0E0E0" }}
              >
                <Grid.Col span={6}>
                  <Text>Tax (2%)</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text style={{alignContent:"right"}}>${cartItems.taxPrice}</Text>
                </Grid.Col>
              </Grid>

              <Grid style={{ margin: "10px 0" }}>
                <Grid.Col span={6}>
                  <Text>Total</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text  style={{alignContent:"right"}}>${cartItems.totalPrice}</Text>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              onClick={() => handlerOrderCreate()}
              loading={createOrderLoading}
              color="dark"
              radius="lg"
              fullWidth
            >
              Place Order
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </Layout>
  );
};

export default PlaceOrder;
