import { Card,
        Grid,
        Radio,Image, 
        TextInput, 
        Text, 
        NumberInput, 
        Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import esewaCall from "./esewa";

const DisplayCartItems = () =>{
    const { cartItems } = useSelector( (state: State) => state.cart )
    
    return cartItems.map((item: any, index: number) => {
        return (
            <Card
            key = {index}
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
}

export default function Checkout(){

    const [ cartItems, orderCreate  ]= useSelector( (state: State) => [state.cart.cartItems, state.orderCreate.orderCreate] )

    const dispatch = useDispatch();

    const { createOrder } = bindActionCreators(actionCreators, dispatch);

    const form = useForm({
        initialValues: {
        address: "",
        city: "",
        postalCode: "",
        country: "",
        number:"",
        paymentMethod: "onDelivery",

    }});

    const handleSubmit = (values: any) =>{
        console.log( values )
        createOrder(
            cartItems,
            {address: values.address, city: values.city, postalCode: values.postalCode, country: values.country},
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            values.paymentMethod
        )

    }

      useEffect(() => {
    if (Object.keys(orderCreate).length) {
      // navigate(`/order/${orderCreate._id}`);
      esewaCall({   amount : itemsPrice,
                    total_amount: totalPrice as any,
                    product_delivery_charge: shippingPrice,
                    tax_amount: taxPrice,
                    product_service_charge: 0 
                })
    }
    
    // eslint-disable-next-line
  }, [dispatch,orderCreate]);

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

    return <>
        <Card padding="xl" withBorder radius="lg" shadow="xl">
            <Grid>
                <Grid.Col span = {12}>
                    <h2>Order Items</h2>
                </Grid.Col>
                <Grid.Col span={12}>
                    <DisplayCartItems />
                </Grid.Col>
                <Grid.Col span={12}>
                    <h2 style={{ margin: "10px 0" }}>Order Summary</h2>
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
            </Grid>
            <form 
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >   
                <h2>Personal Information</h2>
                <Grid style={{ marginTop: "2rem" }}>
                    <Grid.Col span={12}>
                    <NumberInput
                        radius="lg"
                        placeholder="9XXXXXXXXX"
                        hideControls
                        {...form.getInputProps("number")}
                    //  error={form.errors.country}
                        label="Phone Number"
                        required
                        withAsterisk
                    />
                    </Grid.Col>
                </Grid>

                <h2>Billing Address</h2>
                <Grid style={{ marginTop: "2rem" }}>
                    <Grid.Col span={12}>
                    <TextInput
                        radius="lg"
                        placeholder="Your Address"
                        {...form.getInputProps("address")}
                    //  error={form.errors.address}
                        label="Address"
                    />
                    </Grid.Col>
                    <Grid.Col span={12}>
                    <TextInput
                        radius="lg"
                        placeholder="Your City"
                        {...form.getInputProps("city")}
                        label="City"
                    />
                    </Grid.Col>
                    <Grid.Col span={12}>
                    <TextInput
                        radius="lg"
                        placeholder="Your Postal Code"
                        {...form.getInputProps("postalCode")}
                        label="Postal Code"
                    />
                    </Grid.Col>
                    <Grid.Col span={12}>
                    <TextInput
                        radius="lg"
                        placeholder="Your Country"
                        {...form.getInputProps("country")}
                    //  error={form.errors.country}
                        label="Country"
                    />
                    </Grid.Col>
                
                    <Grid.Col span={12}>
                        <h2>Payment Method</h2>
                        <Card withBorder shadow="xs" radius="lg">
                            <Grid.Col span={12}>
                            <Radio.Group
                                name="paymentMethod"
                                {...form.getInputProps("paymentMethod")}
                                withAsterisk
                            >
                                <Radio style = {{padding: '8px'}} value="onDelivery" label="Cash on Delivery" />
                                <Radio style = {{padding: '8px'}} value="esewa" label="Esewa" />
                            </Radio.Group>
                            </Grid.Col>
                        </Card>
                    </Grid.Col>
                    
                    <Grid.Col span={12}>
                        <Button
                            // loading={createOrderLoading}
                            type = 'submit'
                            color="dark"
                            radius="lg"
                            fullWidth
                        >
                            Place Order
                        </Button>
                    </Grid.Col>

                </Grid>
            </form>
            
            <Grid style={{ marginTop: "2rem" }}>
            </Grid>
        </Card>
    </>
}