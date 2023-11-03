import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.SECRET
/** 
 * Creates a token for the uid given
 * 
 * @param { string } uid - Uniquie Identifier String 
 * @returns A promise that resolves into a token 
 */

export function createCustomToken( user, SECRET ){
    
    return jwt.sign( user, SECRET)
}


/**
 * Verifies the given token
 *  
 * @param { string } token - token to be verified
 * @returns - A promise that resolves into a value
 */
function verifyToken( token , SECRET) {
    try{

        const user = jwt.verify( token, SECRET );
        if ( !user ) return false
        const { _id, uid, email, fullName} = user
        return user;

    }catch( error ){
        console.log('An error has occurred while validating token ', error )
        return false
    }
}



/**
 * 
 * verification middleware
 * 
 */

export function verificationMiddleware( req, res, next ){

    const idToken = req.header('Authorization').split('Bearer ')[1];
    console.log( idToken )

    const result =  verifyToken( idToken, SECRET )

    if( !result ) return res.status( 401 ).json({ status: 'unsuccessful', task: 'validiate ', reason: 'Invalid Token'})  
    
    res.locals.user = result
    next()
}