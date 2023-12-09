import { Button, Card, Grid, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import Steps from "../../components/Steps";

import { BsCreditCard2Front, BsBox } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators, State } from "../../state";

import { bindActionCreators } from "redux";
import { useEffect } from "react";

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from 'uuid';
// interface params {
//   amt: number;
//   psc: number;
//   pdc: number;
//   txAmt: number;
//   tAmt: number;
//   pid: string;
//   scd: string;
//   su: string;
//   fu: string;
// }

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
    return parseInt((Math.round(num * 100) / 100).toFixed(2));
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc: any, item: any) => {
      return acc + item.price * item.quantity;
    }, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);

  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const handlerOrderCreate = () => {
    createOrder(
      cartItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentMethod
    );
  };
  useEffect(() => {
    if (Object.keys(orderCreate).length) {
      navigate(`/order/${orderCreate._id}`);
    }
    // eslint-disable-next-line
  }, [orderCreate]);

  const esewaCall = () => {
    const uuid = uuidv4()

    const Message = `total_amount=100,transaction_uuid=${uuid},product_code=EPAYTEST`
    const secret = "8gBm/:&EnhH.1/q"
    var hash = CryptoJS.HmacSHA256(Message, secret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    console.log(hashInBase64,"5555", hash,"55555555", uuid)

    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    var params = {
      amount: "100",
      failure_url: "https://google.com",
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: hashInBase64,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:3000/esewa_payment_success",
      tax_amount: "0",
      total_amount: "100",
      transaction_uuid: uuid,
    };

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute(
        "value",
        params[key as keyof typeof params].toString()
      );
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
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
                  c="gray"
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
                <Text style={{ marginLeft: "10px" }} color="gray" size="sm">
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
                          <Text style={{ alignContent: "left" }} color="gray">
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
                          <Text style={{ alignContent: "right" }}>
                            {item.quantity} x Rs. {item.price}
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
                <Text style={{ alignContent: "right" }}>
                  Rs.{" "}
                  {cartItems
                    .reduce(
                      (acc: any, item: any) => acc + item.quantity * item.price,
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
                <Text style={{ alignContent: "right" }}>Rs. {taxPrice}</Text>
              </Grid.Col>
            </Grid>

            <Grid style={{ margin: "10px 0" }}>
              <Grid.Col span={6}>
                <Text>Total</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text style={{ alignContent: "right" }}>Rs. {totalPrice}</Text>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button
            // onClick={() => handlerOrderCreate()}
            onClick={() => esewaCall()}
            // loading={createOrderLoading}
            color="dark"
            radius="lg"
            fullWidth
          >
            Place Order
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default PlaceOrder;
