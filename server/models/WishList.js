import {Schema, model } from 'mongoose';

export const wishListItemSchema = new Schema({
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

export const wishListSchema = Schema({
    wishList: [ wishListItemSchema ]
})

const WishList = model('wishList', wishListSchema )

export default WishList
