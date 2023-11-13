import { useDispatch, useSelector } from "react-redux"
import { State, actionCreators } from "../../../state"
import { bindActionCreators } from "redux"
import { useEffect } from "react"
import ReviewCard from "../../../components/reviews/ReviewCard"

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
                return <ReviewCard key = { review.reviews._id } id = { review.reviews.id }
                                   name = { 'Random Person'}
                                   date = { review.reviews.createdAt }
                                   comment = { review.reviews.review }
                                   rating = { review.reviews.rating } />

            }): ''}
        </div>
    </>
}

export default MyReviews