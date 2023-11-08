import { useForm } from "@mantine/form";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State, actionCreators } from "../../state";
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { ActionType } from "../../state/action-types";
import { AiFillStar } from "react-icons/ai";
import { IoIosCloseCircle, IoIosUnlock } from "react-icons/io";
import ReviewCard from "./ReviewCard";
import { v4 as uuidv4 } from 'uuid';


interface Reviews {
  createdAt: Date;
  rating: Number;
  fullName: String;
  review: String;
  userId: String;
  _id: String;
}

interface MyProps {
  reviewM: Reviews[]; 
}


export const Review: FC<MyProps> = ({ reviewM }): JSX.Element => {
  const dispatch = useDispatch();

  const { getProduct, addReview, addToCart } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [opened, setOpened] = useState(false);


  const { userInfo } = useSelector((state: State) => state.userLogin);
  const product = useSelector( ( state: State ) => state.product.product)
  // const {
  //   review,
  //   loading: reviewLoading,
  //   error: reviewError,
  // } = useSelector((state: State) => state.review);

  const ratingLevels = [
    { value: "1", label: "1 - Poor" },
    { value: "2", label: "2 - Fair" },
    { value: "3", label: "3 - Good" },
    { value: "4", label: "4 - Very Good" },
    { value: "5", label: "5 - Excellent" },
  ];


  const form = useForm({
    initialValues: {
      rating: "",
      comment: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });
  // useEffect(() => {
  //   // if (reviewError !== null) {
  //   //   notifications.showNotification({
  //   //     title: "Error!",
  //   //     message: reviewError,
  //   //     color: "red",
  //   //   });
  //   // }
  //   dispatch({
  //     type: ActionType.ADD_REVIEW_RESET,
  //   });
  //   // eslint-disable-next-line
  // }, [reviewError]);

    // useEffect(() => {
    //   if (review && Object.keys(review).includes("message")) {
    //     notifications.showNotification({
    //       title: "Success!",
    //       message: review.message,
    //       color: "green",
    //     });
    //   }
    //   // eslint-disable-next-line
    // }, [review]);


  const handleSubmit = (values: any) => {
    const { rating, comment } = values;
   // addReview(params as string, parseInt(rating), comment);
    setOpened(false);
    addReview( product._id, rating, comment )
    dispatch({
      type: ActionType.ADD_REVIEW_RESET,
    });
  };


  return (
    <>

      <Grid my = "20px" >
         
         <Grid.Col span={{ base: 12, md: 6, lg: 7 }}>
       
          {" "}
          <Card
            style={{ marginTop: "1.5rem" }}
            radius="lg"
            shadow="xl"
            withBorder
          >
            <Text color="gray" size="md">
              Reviews
            </Text>

            <div style={{ marginTop: "1rem" }}>
              {reviewM ? (
                reviewM.map((review: any) => {
                  return (
                    <ReviewCard
                      comment={review.review}
                      date={review.createdAt}
                      id={review._id}
                      // name={review.name}
                      name={ review.fullName }
                      rating={review.rating}
                      key={uuidv4()}
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
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
        
          {
            <Group justify="flex-end" >
             
             
                <Text>
                    {product.rating}
                  </Text>
                <AiFillStar color="orange" size="18" />
             
            </Group>
          }

          {!userInfo ? (
            <Alert
              icon={<IoIosUnlock size={16} />}
              style={{ marginTop: "1rem" }}
              color="blue"
              radius="lg"
            >
              Log In to add a review
            </Alert>
          ) : (
            <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <TextInput
                withAsterisk
                label="Number"
                placeholder="Rating"
                {...form.getInputProps('rating')}
              />
              <TextInput
                withAsterisk
                label="comment"
                placeholder="comment"
                {...form.getInputProps('comment')}
              />
    
      
              <Group justify="flex-end" mt="md">
                <Button radius="lg" type="submit">Submit</Button>
              </Group>
            </form>
          </Box>
    
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};
export default Review;
