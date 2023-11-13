/**
 * TODO
 * 
 * add a little bit of description
 * 
 */
import mongoose, { Schema } from 'mongoose'

const wishListItem = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

    title: {
        type: String,
        requried: true
    },
    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        requried: true
    },
    
    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const cartItem = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

    title: {
        type: String,
        requried: true
    },
    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        requried: true
    },

    quantity: {
        type: Number,
        required: true
    }

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
        select: false
    },
    fullName:{
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    phoneNumber: {
        type: String,
        select: false    
    },
    
    wishList: [ wishListItem ],

    cart: [ cartItem ]

}, { timestamps: true } )

const User = mongoose.model( 'User', userSchema )
export default User