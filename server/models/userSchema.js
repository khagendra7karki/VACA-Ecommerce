// make user schem with basic email and password fields
import mongoose from 'mongoose'

const user = { 
    uid:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
    },
    fullName:{
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    phoneNumber: {
        type: String    
    },
    
    whishlist:[
        {
            product: {
                type:  mongoose.Schema.Types.ObjectId,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }

        }
    ]

}

const userSchema = new mongoose.Schema( user )

export default mongoose.model( 'user', userSchema )