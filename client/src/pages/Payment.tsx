import {
  Card,
  Grid,
  Text,
  RadioGroup,
  Radio,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router";
import Steps from "../components/Steps";

import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { useDispatch } from "react-redux";
import Layout from "../Layout/Layout";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { savePaymentMethod } = bindActionCreators(actionCreators, dispatch);

  const handlerAddPaymentMethod = (method: string) => {
    navigate("/placeorder");
    savePaymentMethod(method);
  };

  return (
    <Layout>
      <Card withBorder shadow="xl" radius="lg" padding="xl">
        <Steps active={2} />
        <Grid  style={{ marginTop: "2rem" }}>
          <Grid.Col span={12}>
            <Text  style={{ margin: "10px 0" }}>Select Payment Method</Text>
            <Card withBorder shadow="xs" radius="lg">
              <Grid.Col span={12}>
                <RadioGroup value="credit" color="dark" required>
                  <Radio checked size="sm" value="credit" label="   Credit Card or PayPal"/>
                </RadioGroup>
              </Grid.Col>
            </Card>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              onClick={() => handlerAddPaymentMethod("PayPal")}
              radius="lg"
              color="dark"
              fullWidth
            >
              Continue
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </Layout>
  );
};

export default Payment;
