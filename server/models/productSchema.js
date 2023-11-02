import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const review = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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

// const Reviews = new Schema({
//     reviews: [ review ]
// }, { timestamps: true  })

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

    reviews:[
        {
            type: review
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
const ProductWithoutReview = {
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true,
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

    rating: {
        type : Number,
        required: true,
        default: 0
    
    },
}
export { ProductWithoutReview } 
