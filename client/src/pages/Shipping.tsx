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
   
    
  });

  const handlerAddShipping = (values: any) => {  
    console.log(values) 
    saveShippingAddress(values);
    navigate("/payment");
   
  };

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/login?redirect=shipping");
  //   }
  //   // eslint-disable-next-lineadd
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
              //  error={form.errors.address}
                label="Address"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                radius="lg"
                placeholder="Your City"
                {...form.getInputProps("city")}
              //  error={form.errors.city}
                label="City"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                radius="lg"
                placeholder="Your Postal Code"
                {...form.getInputProps("postalCode")}
             //   error={form.errors.postalCode}
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
              <Button
                type="submit"
              //  onClick={() => navigate("/payment")}
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