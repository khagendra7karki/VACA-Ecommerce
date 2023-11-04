import { Stepper } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { v4 as uuidv4 } from 'uuid';

interface IStepProps {
  active: number;
  steps?: any[];
}

const Steps: React.FC<PropsWithChildren<IStepProps>> = ({
  active = 1,
  steps = [
    {
      label: "Authenticate",
      description: "Login with an account",
    },
    {
      label: "Shipping",
      description: "Confirm shipping address",
    },
    {
      label: "Payment",
      description: "Pay amount",
    },
    {
      label: "Order",
      description: "Place order",
    },
  ],
}) => {
  return (
    <Stepper color="dark" active={active}
    // breakpoint="sm"
     >

      {steps.map((step, i) => {
        return (
          <Stepper.Step
            key={uuidv4()}
            label={step.label}
            description={step.description}
          ></Stepper.Step>
        );
      })}
    </Stepper>
  );
};

export default Steps;
