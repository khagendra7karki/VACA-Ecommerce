/**
 * 
 * all the routes 
 * directed from here
 * 
 */

import express from 'express'
import productController from '../controller/product/productController.js'
import userController from '../controller/user/userController.js'
import reviewController from '../controller/review/reviewController.js'

//
// admin routes
//
// import adminRoutes from './admin/index.js'


const router = express.Router()


//product routers
router.get('/getProducts', productController.getProduct)
router.get('/getProduct/:id', productController.getProductById )
router.delete('/deleteProduct/:id',productController.deleteProductById)
router.post( '/addProduct', productController.storeProduct)

//user router
router.post( '/registerUser', userController.registerUser );
router.post('/login', userController.login )

//reveiw routers

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
router.post( '/addReview', reviewController.addReview )
// router.get( '/getReview/:id', reviewController.getReview)


// routere.post('/')
// router.use('/', adminRoutes )
export default router 