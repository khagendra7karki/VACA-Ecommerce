/**
 * 
 * all the routes 
 * directed from here
 * 
 */

import express from 'express'
import productRouter from './product/index.js'
import userRouter from './user/index.js'

import reviewController from '../controller/review/reviewController.js'

import orderRouter from './order/index.js'

import cartRouter from './cart/index.js'

import reviewRouter from './review/index.js'
//
// admin routes
//
// import adminRoutes from './admin/index.js'


const router = express.Router()


//product routers
router.use('/', productRouter );

//user router
router.use('/', userRouter );

//order routes
router.use('/order/', orderRouter );

//cart routes
router.use('/cart/', cartRouter );

//wishList routes
router.use('/wishList/', cartRouter );

//review routes
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
router.use( '/review', reviewRouter)



//testing....



//END testing..

// router.get( '/getReview/:id', reviewController.getReview)


// routere.post('/')
// router.use('/', adminRoutes )
export default router 