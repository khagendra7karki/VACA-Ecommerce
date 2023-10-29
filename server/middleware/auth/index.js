import firebase from 'firebase-admin'
const {  initializeApp, auth } = firebase

const app = firebase.initializeApp({
    serviceAccountId:'firebase-adminsdk-7eynm@vaca-ecommerce.iam.gserviceaccount.com',
})


/**
 * Creates a token for the uid given
 * 
 * @param { string } uid - Uniquie Identifier String 
 * @returns A promise that resolves into a token 
 */

export function createCustomToken( uid ){
    
        
        return new Promise (( resolve, reject ) => {
            auth().createCustomToken( uid ).then( result =>{
            resolve( result )})
            .catch( error => {
                console.log( 'An error occurred at Create Cusstom Token', error);
                reject( error );
        })
        return token;
    })
    
}


/**
 * Verifies the given token
 *  
 * @param { string } token - token to be verified
 * @returns - A promise that resolves into a value
 */
async function verifyToken( token ) {

    try{
        const result = await auth().verifyIdToken( token )
        if( result )
            return true
        return false
    }
    catch( error ){
        console.log( `An error occurred at Verify token `, error);
    }
}


// export function loginMiddleWare( req, res, next ){
    
//     const result = Promise.resolve(createCustomToken( req.body.uid )).
//     catch( (error ) =>{
//         console.log('An error at login Middleware has occurred', error )
//         return
//     })
//     if ( !result ) return res.status( 500 ).json( { status: 'unsuccessful', task: 'login', reason: 'Internal errror'})

//     next()
// }


export function verificationMiddleware( req, res, next ){
    const idToken = req.header('Authorization').split('Bearer ')[1];
    const result = Promise.resolve( verifyToken( idToken )).
    catch( ( error ) =>{
        console.log( 'An error at Verfication Middleware has occurred', error );
    })
    if( !result ) return res.status( 401 ).json({ status: 'unsuccessful', task: 'validiate ', reason: 'Invalid Token'})  
    next()
}