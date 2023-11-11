import express from 'express'
import userController from '../../controller/user/index.js'

const userRouter = express.Router()

//user router
userRouter.post( '/registerUser', userController.registerUser );
userRouter.post('/login', userController.login );
userRouter.put('/:id/updateProfile', userController.updateProfile );


export default userRouter