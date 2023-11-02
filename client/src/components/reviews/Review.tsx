import { useForm } from '@mantine/form';
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, actionCreators } from '../../state';
import { Alert, Button, Card, Group, NumberInputHandlers, Text } from '@mantine/core';
import { ActionType } from '../../state/action-types';
import { AiFillStar } from 'react-icons/ai';
import { IoIosCloseCircle, IoIosUnlock } from 'react-icons/io';
import ReviewCard from './ReviewCard';
// type ReviewType = {
//   createdAt : Date,
//   rating : Number,
//   review : String,
//   userId : String, 
//   _id : String

// }

interface Reviews {
  createdAt : Date,
  rating : Number,
  review : String,
  userId : String, 
  _id : String,
  

}

interface MyProps {
  reviewM: Reviews[]; // This prop is an array of MyObject
}
// interface Parameter {
//     params : String
// }

export const Review : FC <MyProps> = ({reviewM}) : JSX.Element => {

  const dispatch = useDispatch();


  const form = useForm({
    initialValues: {
      rating: "",
      comment: "",
    },
    // validationRules: {
    //   rating: (value) => value.trim().length >= 1,
    //   comment: (value) => value.trim().length >= 1,
    // },
    // errorMessages: {
    //   rating: "Rating is not valid",
    //   comment: "Comment is not valid",
    // },
  });

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

//   useEffect(() => {
//     if (review && Object.keys(review).includes("message")) {
//       notifications.showNotification({
//         title: "Success!",
//         message: review.message,
//         color: "green",
//       });
//     }
//     // eslint-disable-next-line
//   }, [review]);

  // useEffect(() => {
  //   getProduct(params as string);
  //   // eslint-disable-next-line
  // }, [dispatch, review, quickSearch]);

  const handlerAddReview = (values: any) => {
    const { rating, comment } = values;
   // addReview(params as string, parseInt(rating), comment);
    setOpened(false);
    dispatch({
      type: ActionType.ADD_REVIEW_RESET,
    });
  };
 // console.log(ReviewM,typeof(ReviewM), "dsdadddddddddsssssddddddddddddddddd")

  return (
    <>
    <Card style={{ marginTop: "1.5rem" }} radius="lg" shadow="xl" withBorder>
            {Object.keys(product).length && (
              <Group >
                <Text color="gray" size="md" >
                  Reviews
                </Text>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {/* <Text  style={{ marginRight: "10px" }}>
                    {product.rating.toFixed(1)}
                  </Text> */}
                  <AiFillStar color="orange" size="18" />
                </div>
              </Group>
            )}

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
              <Group style={{ marginTop: "1rem" }} >
                <Button
                  radius="lg"
                  style={{ marginLeft: "10px" }}
                  color="dark"
                  size="xs"
                  onClick={() => setOpened(true)}
                >
                  Add Review
                </Button>
              </Group>
            )}

            {/* <div style={{ marginTop: "1rem" }}>
              {Object.keys(product).length && ReviewM ? (
                ReviewM.map((review: any) => {
                  return (<></>
                    // <ReviewCard
                    //   comment={review.review}
                    //   date={review.createdAt}
                    //   id={review._id}
                    //   // name={review.name}
                    //   name = 'sdsdcs'
                    //   rating={review.rating}
                    //   key={review._id}
                    // />
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
          </Card>
    </>
  )
}
export default Review