import { Card, Grid, Text, Divider } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import moment from "moment";

interface IReviewCard {
  id: string;
  name: string;
  date: Date;
  comment: string;
  rating: number;
}

const renderRatingsList = (rating: number) => {
  const stars = [];

  for (let i = 1; i <= rating; i++) {
    stars.push(<AiFillStar color="orange" />);
  }

  let remainingStars = 5 - stars.length;

  for (let i = 1; i <= remainingStars; i++) {
    stars.push(<AiOutlineStar />);
  }

  return <div>{stars}</div>;
};

const ReviewCard: React.FC<PropsWithChildren<IReviewCard>> = ({
  id,
  name,
  date,
  comment,
  rating,
}) => {
  return (
    <>
      <Grid>
        <Grid.Col
          // xs={12}
          // sm={3}
          // md={2}
          // lg={2}
          // xl={2}
          style={{ display: "flex", alignItems: "center" }}
          span={2}
        >
          <Grid.Col span={12}>
            <Text style={{ marginBottom: "5px" }} >
              {name}
            </Text>
            <Text
              color="gray"
              style={{ marginBottom: "5px" }}
             // size="xs"
            
            >
              {moment(date).format("DD-MMM-YYYY")}
            </Text>
            {renderRatingsList(rating)}
          </Grid.Col>
        </Grid.Col>
        <Grid.Col
          // xs={12}
          // sm={9}
          // md={10}
          // lg={10}
          // xl={10}
          style={{ display: "flex", alignItems: "center" }}
          span={10}
        >
          <Text >"{comment}"</Text>
        </Grid.Col>
      </Grid>
      <Divider />
    </>
  );
};

export default ReviewCard;
