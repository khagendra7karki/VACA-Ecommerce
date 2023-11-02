/**
 * TODO
 * create a utils files that saves the documents
 */
import mongoose from "mongoose";
import userSchema from "../../models/userSchema.js";
import bcrypt from 'bcrypt';
import dotenv from  'dotenv';
import { createCustomToken } from "../../middleware/auth/index.js";

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
    const newUser = new userSchema(user);
    const result = await newUser.save();
    console.log('Lean applied result ', result );
    return { status: 'successful', task: 'addUser', payload: {...result._doc, token } };
};

const userController = {
    //create user

    registerUser: async(req, res ) =>{
        try{
            const { accessToken , ...user } = req.body;
            console.log( user )            
            console.log( `The access token is`, accessToken )

            //hash user password
            if( user.password ){
                user.password = await hashPassword( user.password, SALT_ROUND );
            }

            const result = await createUser( user, accessToken );
            
            res.status( 200 ).json( result )

        }
        catch(error){
            res.status( 500 ).json( {status: 'unsuccessful', task: 'getUser', reason: 'Internal Server Error'} )
            console.log('An error occurred', error)
        }
    },

    /**
     * 
     * @param { * } res - response object
     * @param { * } req - request object
     * @param { string } req.body.email - user email
     * @param { stirng } req.body.password - user password 
     * @returns user id
     */
    login: async( req, res ) =>{
        try{
            
            console.log( req.body ) 
            const user = await userSchema.findOne( {email: req.body.email} ).lean()
            // console.log( 'User object', user );
            if( !user ) return res.status( 401 ).json( {status: 'unsuccessful', task: 'login', reason: 'Invalid Credentials'} )
            
            const result = await bcrypt.compare( req.body.password, user.password)
            console.log( 'Hash result ', result)
            if ( !result ) return res.status( 401 ).json( { status: 'unsuccessful', task: 'login', reason: 'Incorrect Password'})
            
            //generate the access Token for the corresponding user
            const { _id, uid, email, password, fullName, cart, wishList } = user
            
            const token = await createCustomToken( { _id, uid, email, password, fullName } , SECRET );
            res.status( 200 ).json( { status: 'successful', task: 'login', payload: {...user , cart, wishList, token } })

        }catch( error ) {
            console.log('An error occurred', error)
        }
    },

}

export default userController