/**
 * TODO
 * 
 * add a little bit of description
 * 
 */
import mongoose, { Schema } from 'mongoose'
import { ProductWithoutReview } from './productSchema.js'

const wishListItem = new mongoose.Schema({
    ...ProductWithoutReview,

    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true })


const WishList = new mongoose.Schema({
    items: [ wishListItem ],

}, { timestamps: true })


const cartItem = new mongoose.Schema({

    ...ProductWithoutReview,

    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const Cart = new mongoose.Schema({
    items: [ cartItem ],

}, { timestamps: true })


const userSchema = new mongoose.Schema( { 
    uid:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
    },
    fullName:{
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    phoneNumber: {
        type: String    
    },
    
    wishList: {
        type: WishList,
        default: { items: []}

    },
    
    cart: {
        type: Cart,
        default: { items: []}
    } ,

}, { timestamps: true } )

const userModel = mongoose.model( 'user', userSchema )
export default userModel