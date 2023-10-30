/**
 * TODO
 * 
 * add a little bit of description
 */
import mongoose, { Schema } from 'mongoose'

const wishListItem = new mongoose.Schema({
    product: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true })


const WishList = new mongoose.Schema({
    items: [ wishListItem ],

}, { timestamps: true })


const cartItem = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

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
    
    whishlist: WishList,
    
    cart: Cart ,

}, { timestamps: true } )

export default mongoose.model( 'user', userSchema )