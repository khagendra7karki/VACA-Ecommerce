import {Schema, model } from 'mongoose';

export const wishListItemSchema = new Schema({
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

export const wishListSchema = Schema({
    wishList: [ wishListItemSchema ]
})

const WishList = model('wishList', wishListSchema )

export default WishList
