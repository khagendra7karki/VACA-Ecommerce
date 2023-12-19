import {
  Card,
  Text,
  Grid,
  Alert,
  Image,
  Loader,
  Group,
} from "@mantine/core";

import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import {
  BsBox,
  BsCreditCard2Front,
  BsCheckCircleFill,
} from "react-icons/bs";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import { useEffect } from "react";


import { ActionType } from "../../state/action-types";

const Order = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const { getOrder } = bindActionCreators(actionCreators, dispatch);

  const { order } = useSelector((state: State) => state.order);

  const { success } = useSelector((state: State) => state.orderPay);


  useEffect(() => {
    getOrder(params.order as string);
    if (success) {
      dispatch({ type: ActionType.CART_CLEAR_ITEMS });
    }
  }, [dispatch,params, success]);

  return (
    <>
      {order && Object.keys(order).length ? (
        <Card withBorder shadow="sm" radius="lg" padding="xl">
          <Grid>
            <Grid.Col span={12}>
              <Text  size="md">
                {`Order ${params.order}`}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>Shipping Address</Text>
              {Object.keys(order).includes("user") ? (
                <Grid style={{ marginTop: "10px" }}>
                  <Grid.Col span={12}>
                    <Card padding="xs" withBorder shadow="sm" radius="lg">
                      <Grid.Col
                        style={{ display: "flex", alignItems: "center" }}
                        span={12}
                      >
                        <BiUser />
                        <Text
                          style={{ marginLeft: "10px" }}
                          color="gray"
                        //  weight={500}
                          size="sm"
                        >
                          {order.user.name}
                        </Text>
                      </Grid.Col>
                      <Grid.Col
                        style={{ display: "flex", alignItems: "center" }}
                        span={12}
                      >
                        <HiOutlineMail />
                        <Text
                          style={{ marginLeft: "10px" }}
                          color="gray"
                        //  weight={500}
                          size="sm"
                        >
                          {order.user.email}
                        </Text>
                      </Grid.Col>
                      <Grid.Col
                        style={{ display: "flex", alignItems: "center" }}
                        span={12}
                      >
                        <BsBox />
                        <Text
                          style={{ marginLeft: "10px" }}
                          color="gray"
                        //  weight={500}
                          size="sm"
                        >
                          {order.shippingAddress.address},{" "}
                          {order.shippingAddress.city}{" "}
                          {order.shippingAddress.postalCode},{" "}
                          {order.shippingAddress.country}
                        </Text>  
                      </Grid.Col>
                      <Grid.Col span={12}>
                        {order.isDelivered ? (
                          <Alert
                            icon={<BsCheckCircleFill />}
                            radius="lg"
                            title="Delivered"
                            color="green"
                          >
                            Your order has been delivered.
                          </Alert>
                        ) : (
                          <Alert
                        //    icon={<BstyleCircleFill />}
                            radius="lg"
                            title="Not Delivered"
                            color="red"
                          >
                            Your order has not been delivered yet.
                          </Alert>
                        )}
                      </Grid.Col>
                    </Card>
                  </Grid.Col>
                </Grid>
              ) : (
                <Loader />
              )}
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>Payment</Text>
              <Grid style={{ marginTop: "10px" }}>
                <Grid.Col span={12}>
                  <Card padding="xs" withBorder shadow="sm" radius="lg">
                    <Grid.Col
                      style={{ display: "flex", alignItems: "center" }}
                      span={12}
                    >
                      <BsCreditCard2Front />
                      <Text
                        style={{ marginLeft: "10px" }}
                        color="gray"
                        size="sm"
                      >
                        {order.paymentMethod}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      {order.isPaid ? (
                        <Alert
                          icon={<BsCheckCircleFill />}
                          radius="lg"
                          title="Paid"
                          color="green"
                        >
                          {order.paidAt }
                        </Alert>
                      ) : (
                        <Alert
                          radius="lg"
                          title="Not Delivered"
                          color="red"
                        >
                          Not paid yet.
                        </Alert>
                      )}


                    
                    </Grid.Col>
                  </Card>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>Order Items</Text>
              <Grid style={{ marginTop: "10px" }}>
                <Grid.Col span={12}>
                  {order.orderItems && order.orderItems.length ? (
                    order.orderItems.map((item: any) => {
                      return (
                        <Card
                          style={{ margin: "10px 0" }}
                          padding="sm"
                          withBorder
                          shadow="sm"
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
                              <Text  c="gray" size="md">
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
                              <Text ta="right" size="md">
                                {item.qty} x Rs. {item.price}
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
              <Card withBorder shadow="sm" radius="lg">
                <Grid
                  style={{ margin: "10px 0", borderBottom: "1px solid #E0E0E0" }}
                >
                  <Grid.Col span={6}>
                    <Text>Price</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text ta="right">Rs. 1399.99</Text>
                  </Grid.Col>
                </Grid>
                <Grid
                  style={{ margin: "10px 0", borderBottom: "1px solid #E0E0E0" }}
                >
                  <Grid.Col span={6}>
                    <Text>Tax (2%)</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text ta="right">Rs. 13.00</Text>
                  </Grid.Col>
                </Grid>
                <Grid
                  style={{ margin: "10px 0", borderBottom: "1px solid #E0E0E0" }}
                >
                  <Grid.Col span={6}>
                    <Text>Discount (5%)</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text ta="right">Rs. 299.00</Text>
                  </Grid.Col>
                </Grid>
                <Grid style={{ margin: "10px 0" }}>
                  <Grid.Col span={6}>
                    <Text>Total</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text ta="right">Rs. 1099.99</Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
          </Grid>

          <Group style={{ marginTop: "1rem" }} 
          >
          </Group>
        </Card>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Order;