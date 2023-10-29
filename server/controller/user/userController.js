import userSchema from "../../models/userSchema.js";
import bcrypt from 'bcrypt';
import dotenv from  'dotenv';

dotenv.config();
const SALT_ROUND = parseInt( process.env.SALT_ROUND )
/**
 * 
 * TODO
 * 
 * tidy it up a bit
 * try to remove if else
 */


const userController = {
    //create user

    registerUser: async(req, res ) =>{
        try{
            const user = req.body;
            console.log( user )
            if( user?.password ){
                console.log( user.password, SALT_ROUND );
                bcrypt.hash( user.password, SALT_ROUND, ( err, hash ) =>{
                    if(err ){
                        res.status(500).json({ status: 'unsuccessful', task: 'adduser', reason: 'internal server error '});
                        console.log( err )
                        return 
                    }
                    res.status( 200 ).json( { status: 'successful', task: 'addUser'})
                    console.log('Hash generated')
                    user.password = hash;
                    console.log( hash )
                    const newUser = new userSchema( user )
                    newUser.save()
    
                })
            }
            else{
                const user = req.body;
                const newUser = new userSchema( user );
                await newUser.save();
                res.status( 200 ).json( {status: 'successful', task: 'addUser'})

            }
        }
        catch(error){
            console.log('An error occurred', error)
        }
    },

    /**
     * 
     * @param {*} res - response object
     * @param { * } req - request object
     * @param { string } req.body.email - user email
     * @param { stirng } req.body.password - user password 
     * @returns user id
     */
    login: async( req, res ) =>{
        try{
            console.log( req.body ) 
            const user = await userSchema.findOne( {email: req.body.email} )
            if( user ){
                console.log( req.body )
                bcrypt.compare( req.body.password, user.password).then( result =>{
                    if( result )
                        res.status( 200 ).json({ status: 'successful', task : 'getUser', payload: user})
                    else
                         res.status( 401).json( {status: 'unsuccessful', task : 'getUser', reason: 'Invalid password'})
                })
            }
            else{
                res.status( 401 ).json( {status: 'unsuccessful', task: 'getUser', reason: 'Invalid Credentials'} )
            }
        }catch( error ) {
            console.log('An error occurred', error)
        }
    },

}

export default userController