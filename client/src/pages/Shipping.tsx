import { Card, Grid, TextInput, Button } from "@mantine/core";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from ".././state";

import { bindActionCreators } from "redux";

import { useForm } from "@mantine/form";
import Layout from "../Layout/Layout";
import Steps from "../components/Steps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: State) => state.userLogin);

  const { saveShippingAddress } = bindActionCreators(actionCreators, dispatch);

  const form = useForm({
    initialValues: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
<<<<<<< HEAD
<<<<<<< HEAD
   
    
  });

  const handlerAddShipping = (values: any) => {  
    console.log(values) 
    saveShippingAddress(values);
    navigate("/payment");
   
=======
    // validationRules: {
    //   address: (value) => value.trim().length >= 2,
    //   city: (value) => value.trim().length >= 2,
    //   postalCode: (value) => value.trim().length >= 2,
    //   country: (value) => value.trim().length >= 2,
    // },
    // errorMessages: {
    //   address: "Address is not valid",
    //   city: "City is not valid",
    //   postalCode: "Postal Code is not valid",
    //   country: "Country is not valid",
    // },
=======
   
    
>>>>>>> ca4b090 (payment error fixed)
  });

  const handlerAddShipping = (values: any) => {  
    console.log(values) 
    saveShippingAddress(values);
<<<<<<< HEAD
>>>>>>> 123eecd (shipping-payment-placOrder-pageSetup)
=======
    navigate("/payment");
   
>>>>>>> ca4b090 (payment error fixed)
  };

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/login?redirect=shipping");
  //   }
<<<<<<< HEAD
<<<<<<< HEAD
  //   // eslint-disable-next-lineadd
=======
  //   // eslint-disable-next-line
>>>>>>> 123eecd (shipping-payment-placOrder-pageSetup)
=======
  //   // eslint-disable-next-lineadd
>>>>>>> ca4b090 (payment error fixed)
  // }, []);

  return (
    <Layout>
      {/* <Headers title="Shipping" /> */}
      <Card padding="xl" withBorder radius="lg" shadow="xl">
        <Steps active={1} />
        <form onSubmit={form.onSubmit((values) => handlerAddShipping(values))}>
          <Grid style={{ marginTop: "2rem" }}>
            <Grid.Col span={12}>
              <TextInput
                radius="lg"
                placeholder="Your Address"
                {...form.getInputProps("address")}
<<<<<<< HEAD
<<<<<<< HEAD
              //  error={form.errors.address}
=======
                error={form.errors.address}
>>>>>>> 123eecd (shipping-payment-placOrder-pageSetup)
=======
              //  error={form.errors.address}
>>>>>>> ca4b090 (payment error fixed)
                label="Address"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                radius="lg"
                placeholder="Your City"
                {...form.getInputProps("city")}
<<<<<<< HEAD
<<<<<<< HEAD
              //  error={form.errors.city}
=======
                error={form.errors.city}
>>>>>>> 123eecd (shipping-payment-placOrder-pageSetup)
=======
              //  error={form.errors.city}
>>>>>>> ca4b090 (payment error fixed)
                label="City"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                radius="lg"
                placeholder="Your Postal Code"
                {...form.getInputProps("postalCode")}
<<<<<<< HEAD
<<<<<<< HEAD
             //   error={form.errors.postalCode}
=======
                error={form.errors.postalCode}
>>>>>>> 123eecd (shipping-payment-placOrder-pageSetup)
=======
             //   error={form.errors.postalCode}
>>>>>>> ca4b090 (payment error fixed)
                label="Postal Code"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                radius="lg"
                placeholder="Your Country"
                {...form.getInputProps("country")}
<<<<<<< HEAD
<<<<<<< HEAD
              //  error={form.errors.country}
=======
                error={form.errors.country}
>>>>>>> 123eecd (shipping-payment-placOrder-pageSetup)
=======
              //  error={form.errors.country}
>>>>>>> ca4b090 (payment error fixed)
                label="Country"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button
                type="submit"
<<<<<<< HEAD
<<<<<<< HEAD
              //  onClick={() => navigate("/payment")}
=======
                onClick={() => navigate("/payment")}
>>>>>>> 123eecd (shipping-payment-placOrder-pageSetup)
=======
              //  onClick={() => navigate("/payment")}
>>>>>>> ca4b090 (payment error fixed)
                radius="lg"
                color="dark"
                fullWidth
              >
                Continue
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Card>
    </Layout>
  );
};

export default Shipping;
