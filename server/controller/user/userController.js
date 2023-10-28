import userSchema from "../../models/userSchema.js";


/**
 * TODO
 * 
 *  Store the password by hashing it
 *  and read the password by resolving the
 *  hashed password
 */
const userController = {
    //create user

    addUser: async(req, res ) =>{
        try{
            const user = req.body.user;
            const newUser = new userSchema( user )
            await newUser.save()
            res.send( 200 ).json( { status: 'successful', task: 'createuser'})
        }
        catch(error){
            console.log('An error occurred', error)
        }
    },
    
    getUser: async( req, res ) =>{
        try{
            const user = await userSchema.findOne( {email: req.param.email} )
            if( user ){
                if( user.password === param.password ){
                    res.send( 200 ).json({ status: 'successful', task : 'getUser', payload: user})
                }
                else{
                     res.send( 401).json( {status: 'unsuccessful', task : 'getUser', reason: 'Invalid password'})
                }
            }
            else{
                res.send( 401 ).json( {status: 'unsuccessful', task: 'getUser', reason: 'Invalid Credentials'} )
            }
        }catch( error ) {
            console.log('An error occurred', error)
        }
    },

}

export default userController