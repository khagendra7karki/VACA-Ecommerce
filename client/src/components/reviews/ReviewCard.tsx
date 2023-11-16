import React, { PropsWithChildren } from "react";
import moment from "moment";
import RatingStars from './RatingStars'

import {
  Text,
  Divider,
} from "@mantine/core";

interface IReviewCard {
  id: string;
  name: string;
  date: Date;
  comment: string;
  rating: number;
}


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
          <RatingStars rating = {rating}/>
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
