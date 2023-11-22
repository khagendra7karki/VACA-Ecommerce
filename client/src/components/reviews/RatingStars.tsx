import { AiFillStar, AiOutlineStar } from "react-icons/ai";


export default function RatingStars({rating, width, height} : { rating: number, width?:number, height?: number}){
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if ( i < rating )
      stars.push(<AiFillStar key={ i }
                           style = {{height: `${height}`, width: `${width}`}}
                           color="orange"  />);
    else 
      stars.push(<AiOutlineStar key={i}
                              style={{height: `${height}`, width: `${width}`}}  />);
                          }


  return <div>{stars}</div>;
};

