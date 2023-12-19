import {model, Schema} from 'mongoose'

const adminSchema = new Schema( { 
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    fullName:{
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        select: false    
    },

}, { timestamps: true } )

const Admin = model( 'Admin', adminSchema )
export default Admin