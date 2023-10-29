import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function createNewUser( email : string , password: string, handleSuccess : ( user: any ) => void ){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log( user )
        handleSuccess( user );
        // ...
      })
      .catch((error) => {
        console.log( error.code )
        console.log (error.message) 
        // ..
      });

}

export default createNewUser;