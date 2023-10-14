import Mongoose from 'mongoose'

const reviewModel = new Mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    productId:{
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    userImage:{
        type: String,
        required: true
    }

}, { timestamps: true})

const review = Mongoose.model( 'review', reviewModel)


export default review