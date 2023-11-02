import express from 'express'
import reviewController from '../../controller/review/reviewController.js'

const reviewRouter = express.Router()


reviewRouter.post('/addReview', reviewController.addReview)
reviewRouter.post('/updateReview', reviewController.updateReview )
reviewRouter.post('/remoerReview', reviewController.removeReview )


export default reviewRouter