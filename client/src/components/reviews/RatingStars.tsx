import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


export default function RatingStars({rating} : { rating: number}){
  const stars = [];

  for (let i = 1; i <= rating; i++) {
    stars.push(<AiFillStar color="orange" key={uuidv4()} />);
  }

  let remainingStars = 5 - stars.length;

  for (let i = 1; i <= remainingStars; i++) {
    stars.push(<AiOutlineStar key={uuidv4()} />);
  }

  return <div>{stars}</div>;
};

