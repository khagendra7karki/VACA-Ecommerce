/**
 * TODO
 * create a utils files that saves the documents
 * 
 * Maybe reviews are not suited here
 */
import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import dotenv from  'dotenv';
import { createCustomToken } from "../../middleware/auth/index.js";
import Product from "../../models/Product.js";
import mongoose from "mongoose";

dotenv.config();
const SALT_ROUND = parseInt( process.env.SALT_ROUND )
const SECRET = process.env.SECRET

/**
 * 
 * @param { string } password - Password to be hashed
 * @param { Number } SALT_ROUND - No. of salt rounds to be used for hashing
 * @returns { string } > Returns promise which resolves with hashed Password
 */
const hashPassword = async (password, SALT_ROUND) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUND, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};


const createUser = async (user, token) => {
    const newUser = new User(user);
    const result = await newUser.save();
    return { status: 'successful', task: 'addUser', payload: {...result._doc, token } };
};

const userController = {
    //create user

    registerUser: async(req, res ) =>{
        try{
            const { accessToken , ...user } = req.body;
            console.log( user )            

            if( user.password ){
                user.password = await hashPassword( user.password, SALT_ROUND );
            }

            const token = createCustomToken( user, SECRET)
            const result = await createUser( user, token );
            
            res.status( 200 ).json( result )

        }catch( error ){
            console.log('An error occurred at registerUser', error)
            res.status( 500 ).json( {status: 'unsuccessful', task: 'getUser', reason: 'Internal Server Error'} )
        }
    },

    /**
     * 
     * @param { * } res - response object
     * @param { * } req - request object
     * @param { string } req.body.email - user email
     * @param { stirng } req.body.password - user password 
     * 
     * @description does something i dont konw about
     */

    login: async( req, res ) =>{
        try{            
            const user = await User.findOne( {email: req.body.email} ).select('+password').lean()
            // console.log( 'User object', user );
            if( !user ) return res.status( 401 ).json( {status: 'unsuccessful', task: 'login', reason: 'Invalid Credentials'} )
            
            const result = await bcrypt.compare( req.body.password, user.password)
        
            if ( !result ) return res.status( 401 ).json( { status: 'unsuccessful', task: 'login', reason: 'Incorrect Password'})
            
            //generate the access Token for the corresponding user
            const { _id, uid, email,  fullName, cart, wishList } = user
            
            const token = await createCustomToken( { _id, uid, email,  fullName } , SECRET );
            res.status( 200 ).json( { status: 'successful', task: 'login', payload: {...user , cart, wishList, token } })

        }catch( error ) {
            console.log('An error occurred', error)
        }
    },


    /**
     * 
     * @param { * } res - response object
     * @param { * } req - request object
     * @param { string } req.body.email - user email
     * @param { stirng } req.body.password - user password 
     */
    updateProfile: async( req, res ) =>{
        try{
            
            const { _id } = res.locals.user;
            const { fullName, email, oldPassword, newPassword, phoneNumber } = req.body
            
            console.log( fullName, email, oldPassword, newPassword, phoneNumber ) 
            const user = await User.findById( _id ).select('+password')

            user.fullName = fullName;
            user.email = email


            if ( oldPassword && newPassword ){
                const passwordMatchStatus = await bcrypt.compare( oldPassword, user.password )
                if ( !passwordMatchStatus ) return res.status( 500 ).json({status: 'unsuccessful', task: 'userUpdate', reason: 'Old Password and new Password do not match'})
                user.password = await hashPassword( newPassword , SALT_ROUND)
            }

            const newUser = await user.save()
            {
                const { _id, fullName, email,  uid } = newUser
                const newToken = createCustomToken( { _id, fullName, email, uid }, SECRET)
                return res.status(200).json({ status: 'successful', task: 'updateUser', payload: { ...newUser._doc, token : newToken }})

            }
 
 

        }catch( error ){
            console.log('An errorr occurred at updateProfile', error )
            return res.status(500).json({status: 'successful', task: 'updateProfile', reason: 'Internal Server Error '})
        }
    },

    getReviews: async ( req, res ) =>{
        try{    
            const { _id } = res.locals.user;

            const reviews = await Product.aggregate([
                {$match: {'reviews.user': new mongoose.Types.ObjectId(_id) }},
                {$unwind: '$reviews'},
                {$project:  {id: '$reviews._id',
                             user :'$reviews.user',
                             rating: '$reviews.rating',
                             review: '$reviews.review',
                             fullName: '$reviews.fullName'}},

            ]).exec()
            
            return res.status(200).json({ status: 'successful', task: 'getReviews', payload:  reviews || 'no Reviews' })

        }catch( error ){
            console.log('An errorr occurred at getReviews', error )
            return res.status(500).json({status: 'successful', task: 'getReviewsById', reason: 'Internal Server Error '})
        }

    }
}

export default userController