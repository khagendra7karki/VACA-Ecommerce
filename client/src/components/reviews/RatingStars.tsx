import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


export default function RatingStars({rating, width, height} : { rating: number, width?:number, height?: number}){
  const stars = [];

  for (let i = 1; i <= rating; i++) {
    stars.push(<AiFillStar key={uuidv4()}
                           style = {{height: `${height}`, width: `${width}`}}
                           color="orange"  />);
  }

  let remainingStars = 5 - stars.length;

  for (let i = 1; i <= remainingStars; i++) {
    stars.push(<AiOutlineStar key={uuidv4()}
                              style={{height: `${height}`, width: `${width}`}}  />);
  }

  return <div>{stars}</div>;
};

