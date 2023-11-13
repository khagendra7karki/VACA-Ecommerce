import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const review = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    review: {
         type: String,
         required: true
    },
    rating: { 
            type: Number,
            default: 0,
            required: true
    
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
    image:[{
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

    color: [
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

const Product = mongoose.model('Product', ProductSchema);

export default Product

