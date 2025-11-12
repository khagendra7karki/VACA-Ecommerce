import bcrypt from 'bcrypt';
import dontenv from 'dotenv';

dontenv.config()


const saltRound = parseInt(process.env.SALT_ROUND)
console.log(saltRound)

bcrypt.hash( 'admin_password', saltRound, ( err, hash ) =>{
    console.log( hash )
})
