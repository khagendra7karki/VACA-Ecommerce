
import express from 'express'
import verifyPayment from '../controller/esewa.js'

// const { getOrderForPayment } = require('../controller/order_controller');
// const { createPayment } = require('../controller/payment_controller');
const esewaRouter = express.Router()

esewaRouter.post(
    '/verify-payment',
    verifyPayment,
    // getOrderForPayment,
    // createPayment
);


export default esewaRouter