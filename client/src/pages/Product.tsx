import React, { useEffect, useRef, useState } from 'react'
import { ActionIcon, Alert, Badge, Button, Grid, Group, Image, NumberInput, NumberInputHandlers, Stack, Text } from '@mantine/core';
import classes from './product.module.css';
import { IoIosCloseCircle, IoIosUnlock } from "react-icons/io";

import { useParams } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { ActionType } from "../state/action-types";
import Loading from '../components/Loading';
import Layout from '../Layout/Layout';
import Review from '../components/reviews/Review';

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
  
  return (
    <Layout>
    {loading ? (
      <Loading />
    ) : (
    <>
     {Object.keys(product).length && (
    <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
    <Grid.Col span={4}>
    <Image src={product.image} alt="Tesla Model S" />
    </Grid.Col>
    <Grid.Col span={4}>
        <Stack
      h={300}
      bg="var(--mantine-color-blue-light)"
      justify="flex-start"
    >
       <Group justify="space-between" mt="md">
        <div> <Text fw={500}>{product.title}</Text>
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
          <Text fz="xs" c="dimmed">
          {product.description}
          </Text>
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>
      <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>
        <Group gap={30}>
        <Group >
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
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
            $
                          {new Intl.NumberFormat().format(
                            value * product.price
                          )}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
            {product.oldPrice}
            </Text>
          </div>
                            
          <Button radius="xl" style={{ flex: 1 }} onClick={() => handlerAddToCart( value, product._id)}>
          

            Add To Cart
          </Button> 
        </Group>
    </Stack>
         
      </Grid.Col>
   
  </Grid>
     )}
 {Object.keys(product).length && (
          
              <Review reviewM={product.review.reviews} />
           
          )}
  </>
 )
  }
  </Layout>
)}

export default Product
