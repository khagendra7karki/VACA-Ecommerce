import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//make a shopping item schema
const ProductSchema = new Schema({
    title:{
        type: String,
        requied: true,
    }, 

    description:{
        type: String,
        requied: true,
    },

    price: {
        type: Number,
        required: true,
    },
    category:{
        type: String,
    },
    image:{
        type: String,
        required: true,
    },
    isOld: {
        type: Boolean,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true
    },

    rating: {
        type : Number,
        required: true,
    }

})

const Product = mongoose.model('Product', ProductSchema);

export default Product