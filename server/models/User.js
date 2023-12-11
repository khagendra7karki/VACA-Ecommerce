import {model, Schema} from 'mongoose'

const wishListItem = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
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

}, { timestamps: true })

const cartItem = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
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
    },
    

}, { timestamps: true })


const userSchema = new Schema( { 
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

const User = model( 'User', userSchema )
export default User