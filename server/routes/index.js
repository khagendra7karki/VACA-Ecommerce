/**
 * 
 * all the routes 
 * directed from here
 * 
 */
import express from 'express'

import userRouter from './user/index.js'

import productRouter from './product/index.js'

import orderRouter from './order/index.js'

import cartRouter from './cart/index.js'

import wishListRouter from './wishList/index.js'

import reviewRouter from './review/index.js'

import esewaRouter from './esewa.js'

import adminRouter from '../controller/admin/routes/index.js'

// import adminRoutes from './admin/index.js'


const router = express.Router()


//product routers
router.use('/product', productRouter );

//user router
router.use('/user', userRouter );

//order routes
router.use('/order', orderRouter );

//cart routes
router.use('/cart', cartRouter );

router.use('/payment', esewaRouter );

//wishList routes
router.use('/wishList', wishListRouter );

//review routes
router.use( '/review', reviewRouter)

// admin route
router.use('/admin', adminRouter)

router.route('/*').all( (req, res ) => res.status(400).send() )

export default router  