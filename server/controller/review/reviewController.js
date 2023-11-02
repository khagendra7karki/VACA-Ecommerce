import productSchema from '../../models/productSchema.js'

const reviewController = {

/**
 * 
    To add review the format of the review should be: 
    const review = {
        productId: { type: Mongoose.Schema.Types.ObjectId },
        userId: { type; Mongoose.Schema.Types.ObjectId },
        review: { type: String },
        rating: { type: Number } //  between 1 - 5 ( integer )



    }


*/    

    addReview: async ( req, res) =>{
        try{
            const review = req.body.review;
            console.log( review )
            const product = await productSchema.findById( review._id )
            product.reviews.push( review )
            await product.save()

            res.status( 200).json( { status: 'successful', task: 'addReview', newValue: product})
        }
        catch( error){
            console.log( 'An error occurred', error )
        }
   },

    // getReview: async ( req, res ) =>{
    //     try{
    //         const productId = req.params.id;
    //         console.log( productId )
    //         const review = await reviewSchema.find( { productId })             
    //         res.status( 200 ).json( { status: 'successful', task: 'getreview', payload: review })
    //     }
    //     catch( error ){
    //         console.log( 'An error occurred', error);
    //     }
    // } 
}


export default reviewController