import express from 'express'
import reviewController from '../../controller/review/reviewController.js'
import { verificationMiddleware } from '../../middleware/auth/index.js'

const reviewRouter = express.Router()


reviewRouter.post('/addReview', verificationMiddleware, reviewController.addReview)
reviewRouter.post('/updateReview', verificationMiddleware,  reviewController.updateReview )
reviewRouter.post('/remoerReview', verificationMiddleware, reviewController.removeReview )


export default reviewRouter