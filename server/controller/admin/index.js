import Admin from "../../models/Admin"
import bcrypt from 'bcrypt';

dotenv.config();
const SALT_ROUND = parseInt( process.env.SALT_ROUND )
const SECRET = process.env.SECRET

const adminController = {
    login: async( req, res) =>{
        try{
            const admin = await Admin.findOne({email: req.body.email}).select('password').lean()
            if( !admin ) throw Error("Not Authorized")
            const result = await bcrypt.compare(req.body.password, admin.password)
            
            if (!result) throw Error("Wrong Password")
            const token = await createCustomToen( admin, SECRET)
            res.status(200).json({payload: token})

        }catch(error){
            console.log("An error occurred ", error);
            if( error.message == "Not Authorized")
                res.status(400).send()
            
        }
    }
}

export default adminController