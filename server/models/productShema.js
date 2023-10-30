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
            required: true
    
    }
},{ timestamps: true})

const Reviews = new Schema({
    reviews: [ review ]
}, { timestamps: true  })

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

    reviews: Reviews ,

    rating: {
        type : Number,
        required: true,
        default: 0
    
    },
},{ timestamps: true })

const Product = mongoose.model('Product', ProductSchema);

export default Product