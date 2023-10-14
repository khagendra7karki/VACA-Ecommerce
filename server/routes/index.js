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
import adminRoutes from './admin/index.js'


const router = express.Router()


//product routers
router.get('/products', productController.getProduct)
router.get('/getproduct/:id', productController.getProductById )
router.delete('/deleteProduct/:id',productController.deleteProductById)
router.post( '/addProduct', productController.storeProduct)

//user router
router.post( '/createuser', userController.createUser )


//reveiw routers
router.post( '/addReview', reviewController.createReview )
router.get( '/getReview/:id', reviewController.getReview)


// routere.post('/')
router.use('/', adminRoutes )
export default router 