import React from "react";
import { Loader, Card } from "@mantine/core";

const Loading = () => {
  return (
    <Card
      shadow="md"
      radius="lg"
      style ={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      withBorder
    >
      <Loader color="dark" />
    </Card>
  );
};

export default Loading;
