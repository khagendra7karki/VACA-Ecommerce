import {model, Schema } from 'mongoose';

const review = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    fullName: {
        type: String,
        requried: true,
    },


    review: {
         type: String,
         required: true
    },
    
    rating: { 
            type: Number,
            required: true,
            default: 0,
    
    }
},{ timestamps: true})


//make a shopping item schema
const ProductSchema = new Schema({
    title:{
        type: String,
        required: true,
    }, 

    description:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true
    },
    images:[{
        type: String,
        required: true,
    }],
    oldPrice: {
        type: Number,
    },
    availableQuantity: {
        type: Number,
        required: true,
        default: 0
    },

    reviews: [ review ],

    size: [
        {
            type: String
        }
    ],

    options: [
        {
            type: String
        }
    ],

    rating: {
        type : Number, 
        required: true,
        default: 0   
    },
},{ timestamps: true })

const Product = model('Product', ProductSchema);

export default Product

