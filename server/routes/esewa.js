
import express from 'express'
import verifyPayment from '../controller/esewa.js'

const esewaRouter = express.Router()

esewaRouter.post(
    '/verify-payment',
    verifyPayment,
);


export default esewaRouter