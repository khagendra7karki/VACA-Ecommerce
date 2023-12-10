import { Card, Grid, Text, Radio, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router";
import Steps from "../../components/Steps";

import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const { savePaymentMethod } = bindActionCreators(actionCreators, dispatch);

  const handlerAddPaymentMethod = (method: string) => {
    savePaymentMethod(method);
    navigate("/placeorder");
  };

  return (
    <Card withBorder shadow="xl" radius="lg" padding="xl">
      <Steps active={2} />
      <Grid style={{ marginTop: "2rem" }}>
        <Grid.Col span={12}>
          <Text style={{ margin: "10px 0" }}>Select Payment Method</Text>
          <Card withBorder shadow="xs" radius="lg">
            <Grid.Col span={12}>
              <Radio.Group
                name="paymentMethod"
                value={value}
                onChange={setValue}
                withAsterisk
              >
                <Radio value="onDelivery" label="Cash on Delivery" />
                <Radio value="esewa" label="Esewa" />
              </Radio.Group>
            </Grid.Col>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button
            onClick={() => handlerAddPaymentMethod(value)}
            radius="lg"
            color="dark"
            fullWidth
          >
            Continue
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default Payment;
