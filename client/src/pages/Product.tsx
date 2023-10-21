import React, { useEffect, useRef, useState } from 'react'
import { Alert, Badge, Button, Grid, Group, Image, NumberInputHandlers, Stack, Text } from '@mantine/core';
import classes from './product.module.css';
import { IoIosCloseCircle, IoIosUnlock } from "react-icons/io";
import ReviewCard from '../components/ReviewCard';
import { useParams } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { ActionType } from "../state/action-types";

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
  console.log("tttttttt", product)
  const { quickSearch } = useSelector((state: State) => state.quickSearch);

  const { userInfo } = useSelector((state: State) => state.userLogin);

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

  // const handlerAddToCart = (quantity: number, id: string) => {
  //   addToCart(id, quantity);
  // };

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
    console.log(params.id)
    getProduct(params.id as string);
    // eslint-disable-next-line
  }, [dispatch, review, quickSearch]);
console.log("hhhrrrr", product)

  return (
    <>
    <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
    <Grid.Col span={4}>
    <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
    </Grid.Col>
    <Grid.Col span={4}>
        <Stack
      h={300}
      bg="var(--mantine-color-blue-light)"
      justify="flex-start"
    >
       <Group justify="space-between" mt="md">
        <div> <Text fw={500}>Tesla Model S</Text>
          <Text fz="xs" c="dimmed">
            Free recharge at any station
          </Text>
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>
      <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              $168.00
            </Text>
            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }}>
            Rent now
          </Button>
        </Group>
    </Stack>
         
      </Grid.Col>
   
  </Grid>
  {/* <div style={{ marginTop: "1rem" }}>
              {Object.keys(product).length && product.reviews.length ? (
                product.reviews.map((review: any) => {
                  return (
                    <ReviewCard
                      comment={review.comment}
                      date={review.createdAt}
                      id={review._id}
                      name={review.name}
                      rating={review.rating}
                      key={review._id}
                    />
                  );
                })
              ) : (
                <Alert
                  icon={<IoIosCloseCircle size={16} />}
                  style={{ marginTop: "1rem" }}
                  color="blue"
                  radius="lg"
                >
                  No reviews for this product
                </Alert>
              )}
            </div> */}
  </>
  )
}

export default Product


