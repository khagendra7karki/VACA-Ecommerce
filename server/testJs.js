import bcrypt from 'bcrypt';


bcrypt.hash( 'btrektours01', 10, ( err, hash ) =>{
    console.log( hash )
})
