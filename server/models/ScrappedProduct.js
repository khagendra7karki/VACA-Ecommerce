import {model, Schema } from 'mongoose';

const review = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        sparse: true
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
const ScrappedProductSchema = new Schema({
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

    options: [
        {
            type: String
        }
    ],

    size: [
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

const ScrappedProduct = model('ScrappedProduct', ScrappedProductSchema);

export default ScrappedProduct
