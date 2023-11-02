import React, { PropsWithChildren } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import moment from "moment";
import {
  Text,
  Card,
  Divider,
} from "@mantine/core";

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
    stars.push(<AiFillStar color="orange" key={i} />);
  }

  let remainingStars = 5 - stars.length;

  for (let i = 1; i <= remainingStars; i++) {
    stars.push(<AiOutlineStar key={i} />);
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
      <div style={{ display: "flex" }}>
        <div>
          <Text size="lg" style={{ marginBottom: "5px" }}>
            {name}
          </Text>
          <Text color="gray" size="xs">
            {moment(date).format("DD-MMM-YYYY")}
          </Text>
          {/* {renderRatingsList(rating)} */}
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Text size="lg">"{comment}"</Text>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ReviewCard;
