import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


export default function RatingStars({rating, width, height} : { rating: number, width?:number, height?: number}){
  const stars = [];
  for (let i = 1; i <= rating; i++) {
    if ( i <= rating )
      stars.push(<AiFillStar key={ i }
                           style = {{height: `${height}`, width: `${width}`}}
                           color="orange"  />);
    else 
      stars.push(<AiOutlineStar key={i}
                              style={{height: `${height}`, width: `${width}`}}  />);
                          }


  return <div>{stars}</div>;
};

