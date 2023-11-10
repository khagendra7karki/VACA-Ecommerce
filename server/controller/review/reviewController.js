/**
 * TODO
 * 
 * verify the sent user exists in the background
 * 
 */
import mongoose from 'mongoose';
import productSchema from '../../models/productSchema.js'
import { reviewSchema } from '../../models/productSchema.js';

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
                $push: { "review.reviews": review }
            }, { new: true }).lean()

            const averageRating = product.review.reviews.reduce( ( acc, current) =>{
                return acc + current.rating 
            },0) / product.review.reviews.length
            
            const finalProduct = await productSchema.findByIdAndUpdate( productId, { 
                $set: { rating: averageRating.toFixed(1)}
            }, { new: true }).lean()


            //aggregate version of the code
            
            // .aggregate( [
            //     {$match: { _id: new mongoose.Types.ObjectId(productId) }}, 
            //     { $set: { "review.reviews": { $concatArrays: ["$review.reviews", [{ ...review, createdAt: new Date() , updatedAt: new Date() }] ]}}},
            //     { $set: { 
            //         "rating": { 
            //             $divide: [
            //                 {
            //                     $reduce: {
            //                         input: "$review.reviews",
            //                         initialValue: 0,
            //                         in: {$add: [ "$$value", "$$this.rating"] }
            //                     }
            //                 }, 
            //                 {
            //                     "$cond": [
            //                                 { "$ne": [ { "$size": "$review.reviews" }, 0 ] },
            //                                 { "$size": "$review.reviews" }, 
            //                                 1
            //                         ]
            //                 }
            //             ]
            //         }
            //     }
            // }
            
            // ]
            // ).exec()

            res.status( 200).json( { status: 'successful', task: 'addReview', payload: finalProduct})
        }
        catch( error){
            console.log( 'An error occurred', error )
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
                $pull: { "review.reviews": {_id: reviewId} }
            }, { new: true} ).lean()

            res.status( 200).json( { status: 'successful', task: 'addReview', payload: product})
        }
        catch( error){
            console.log( 'An error occurred', error )
        }
   }
}


export default reviewController