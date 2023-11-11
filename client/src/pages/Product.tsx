import React, { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  InputBase,
  NumberInput,
  NumberInputHandlers,
  Pill,
  Select,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import classes from "./product.module.css";
import { IoIosCloseCircle, IoIosUnlock } from "react-icons/io";

import { useParams } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { ActionType } from "../state/action-types";
import Loading from "../components/Loading";
import Layout from "../Layout/Layout";
import Review from "../components/reviews/Review";
import { fontSizeResolver } from "@mantine/core/lib/core/Box/style-props/resolvers/font-size-resolver/font-size-resolver";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { getProduct, addReview, addToCart } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [value, setValue] = useState<any>(1);
  const [opened, setOpened] = useState(false);

  const handlers = useRef<NumberInputHandlers>(null);

  const { product, loading } = useSelector((state: State) => state.product);

  const { quickSearch } = useSelector((state: State) => state.quickSearch);

  const { userInfo } = useSelector((state: State) => state.user);

  const {
    review,
    loading: reviewLoading,
    error: reviewError,
  } = useSelector((state: State) => state.review);

  // const handlerAddReview = (values: any) => {
  //   const { rating, comment } = values;
  //   addReview(params.id as string, parseInt(rating), comment);
  //   setOpened(false);
  //   dispatch({
  //     type: ActionType.ADD_REVIEW_RESET,
  //   });
  // };

  const handlerAddToCart = (quantity: number, id: string) => {
    addToCart(id, quantity);
  };

  useEffect(() => {
    if (reviewError !== null) {
      notifications.show({
        title: "Error!",
        message: reviewError,
        color: "red",
      });
    }
    dispatch({
      type: ActionType.ADD_REVIEW_RESET,
    });
    // eslint-disable-next-line
  }, [reviewError]);

  // useEffect(() => {
  //   if (review && Object.keys(review).includes("message")) {
  //     notifications.show({
  //       title: "Success!",
  //       message: review.message,
  //       color: "green",
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [review]);

  useEffect(() => {
    getProduct(params.id as string);
  }, [dispatch, review, quickSearch]);

  const pills = Array(4)
    .fill(0)
    .map((_, index) => (
      <Pill key={index} withRemoveButton>
        size {index}
      </Pill>
    ));

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(product).length && (
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
              <Grid.Col span={{ base: 12, md: 4, lg: 5 }}>
                <Group justify="center">
                  <Image
                    radius="md"
                    h={550}
                    w="auto"
                    fit="contain"
                    src={product.image}
                    alt="product image"
                  />
                </Group>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 8, lg: 7 }}>
                <Stack
                  h={600}
                  //bg="var(--mantine-color-blue-light)"

                  justify="flex-start"
                >
                  <Group gap="lg">
                    {" "}
                    <Text fw={400} style={{ fontSize: "32px" }}>
                      {product.title}
                    </Text>
                    {product.availableQuantity === 0 ? (
                      <Badge
                        color="red"
                        style={{ marginLeft: "10px" }}
                        variant="filled"
                      >
                        {" "}
                        Sold Out
                      </Badge>
                    ) : (
                      <Badge
                        color="green"
                        style={{ marginLeft: "10px" }}
                        variant="filled"
                      >
                        {" "}
                        In Stock
                      </Badge>
                    )}
                  </Group>
                  <Space h="xs" />
                  <Group gap="lg">
                    <Text>Rs - {product.price}</Text>
                    <Badge variant="outline">25% off</Badge>
                  </Group>
                  <Divider my="sm" />
                  <Group gap="lg">
                    <Text>Color</Text>
                    <Select
                      // label="Your favorite color"
                      placeholder="Pick value"
                      data={["Blue", "Yellow", "Red", "Green"]}
                    />
                  </Group>
                  <Group>
                    {" "}
                    <InputBase component="div" multiline>
                      <Pill.Group>{pills}</Pill.Group>
                    </InputBase>
                  </Group>
                  <Divider my="sm" />

                  <Group gap={30}>
                    <Group>
                      <ActionIcon
                        size={28}
                        radius="lg"
                        variant="filled"
                        color="dark"
                        onClick={() => handlers?.current?.decrement()}
                      >
                        –
                      </ActionIcon>
                      <NumberInput
                        hideControls
                        value={value}
                        onChange={(val) => setValue(val)}
                        handlersRef={handlers}
                        max={10}
                        min={1}
                        step={1}
                        styles={{
                          input: { width: 54, textAlign: "center" },
                        }}
                        radius="lg"
                      />
                      <ActionIcon
                        size={28}
                        radius="lg"
                        variant="filled"
                        color="dark"
                        onClick={() => handlers?.current?.increment()}
                      >
                        +
                      </ActionIcon>
                    </Group>
                    {/* <div>
                      <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                        $
                        {new Intl.NumberFormat().format(
                          value * product.price
                        )}
                      </Text>
                      <Text
                        fz="sm"
                        c="dimmed"
                        fw={500}
                        style={{ lineHeight: 1 }}
                        mt={3}
                      >
                        {product.oldPrice}
                      </Text>
                    </div> */}

                    <Button
                      variant="outline"
                      color="rgba(0, 0, 0, 0.71)"
                      //style={{ flex: 1 }}
                      onClick={() =>
                        handlerAddToCart(value, product._id)
                      }
                    >
                      Add To Cart
                    </Button>
                  </Group>
                  <Group>
                    <Button variant="filled">Add to Wishlist</Button>
                  </Group>

                  <Text fz="sm" c="dimmed" className={classes.label}>
                    Basic configuration
                  </Text>
                  <Text fz="sm" c="dimmed" className={classes.label}>
                    Description
                  </Text>

                  <Group>
                    <Text size="md" c="dimmed">
                      {product.description}
                    </Text>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
          )}
          {Object.keys(product).length && (
            <Review reviewM={product.reviews} />
          )}
        </>
      )}
    </Layout>
  );
};

export default Product;
