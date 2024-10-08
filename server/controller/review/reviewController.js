/**
 * TODO
 * 
 * verify the sent user exists in the background
 * 
 */
import mongoose from 'mongoose';
import productSchema from '../../models/Product.js'

const reviewController = {

    /**
     * 
     * Needs review in the body of the request
     * const review = {
     *      productId: { type: Mongoose.Schema.Types.ObjectId },
     *      userId: { type; Mongoose.Schema.Types.ObjectId },
     *      review: { type: String },
     *      rating: { type: Number } //  between 1 - 5 ( integer )
     * }
     * 
     * Returns the new product as the response 
    */

    addReview: async ( req, res) =>{
        try{
            const { productId, review } = req.body;

            // review.rating = parseInt( review.rating )
            const product = await productSchema.findByIdAndUpdate( productId, {
                $push: { "reviews": review }
            }, { new: true }).lean()

            const averageRating = product.reviews.reduce( ( acc, current) =>{
                return acc + current.rating 
            },0) / product.reviews.length
            
            const finalProduct = await productSchema.findByIdAndUpdate( productId, { 
                $set: { rating: averageRating.toFixed(1)},
            },{new: true }).lean()


            res.status( 200).json( { status: 'successful', task: 'addReview', payload: finalProduct.reviews })
        }
        catch( error){
            console.log( 'An error occurred in addReiew', error )
        }
   },

   updateReview: async ( req, res ) =>{
    try{

        /**
         * TODO
         * 
         * Complete this 
         */
        res.status( 200 ).json( { satus: 'successful', task: 'updateReview', payload: product })

    }catch( error ){
        console.log( 'An error occurred while updating review ', error )
        res.status(500).json( { status: 'unsuccessful', task: 'addReview', reason: 'Internal Server Error '});
    }
   },

   removeReview: async ( req, res) =>{
        try{
            const { productId,  reviewId } = req.body;
            console.log( productId, reviewId )
            const product = await productSchema.findByIdAndUpdate( productId, {
                $pull: { "reviews": {_id: reviewId} }
            }, { new: true} ).lean()

            res.status( 200).json( { status: 'successful', task: 'addReview', payload: product})
        }
        catch( error){
            console.log( 'An error occurred occurred in removeRevieww', error )
        }
   }
}


export default reviewController