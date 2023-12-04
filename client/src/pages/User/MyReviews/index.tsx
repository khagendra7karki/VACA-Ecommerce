import { useDispatch, useSelector } from "react-redux";
import { State, actionCreators } from "../../../state";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import ReviewCard from "../../../components/reviews/ReviewCard";

const MyReviews = () =>{
    const dispatch = useDispatch()
    const { getUserReviews } = bindActionCreators( actionCreators, dispatch )
    const { userReview } = useSelector( (state: State ) => state.userReivew )

    useEffect( () =>{
        getUserReviews()
    }, [])

    useEffect( () =>{
        console.log( userReview )
    }, [userReview ])
    return <>
        <div>
            This one from my Reviews
            { userReview ? userReview?.map( (review: any )=>{
                console.log( review )
                return <ReviewCard key = { review._id } id = { review.id }
                                   name = { review.fullName }
                                   date = { review.createdAt }
                                   comment = { review.review }
                                   rating = { review.rating }
                        />

            }): ''}
        </div>
    </>
}

export default MyReviews