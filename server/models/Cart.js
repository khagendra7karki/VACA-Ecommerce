import {Schema, model } from 'mongoose';

export const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        unique: true,
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

export const cartSchema = Schema({
    cart: [ cartItemSchema ]
})

const Cart = model('cart', cartItemSchema )

export default Cart