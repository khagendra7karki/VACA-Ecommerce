import { Card, Grid, TextInput, Button } from "@mantine/core";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { actionCreators } from ".././state";

import { bindActionCreators } from "redux";

import { useForm } from "@mantine/form";
import Steps from "../components/Steps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


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


  return (
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
            <Button
              type="submit"
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
  );
};

export default Shipping;