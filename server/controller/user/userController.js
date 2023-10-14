import userSchema from "../../models/userSchema.js";

const userController = {
    //create user
    createUser: async(req, res ) =>{
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
    //verify user
    // getUserData: async( req, res ) =>{
    //     try{
    //         const user = await userSchema.findOne( {email: param.email} )
    //         if( user ){
    //             if( user.password === param.password ){
    //                 return user
    //             }
    //             else{
    //                 return false
    //             }
    //         }
    //         else{
    //             return false
    //         }
    //     }catch( error ) {
    //         console.log('An error occurred', error)
    //     }
    // },

}

export default userController