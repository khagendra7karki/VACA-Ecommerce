import express from 'express'
import userController from '../../controller/user/index.js'
import { verificationMiddleware } from '../../middleware/auth/index.js';
const userRouter = express.Router()

//user router
userRouter.post( '/registerUser', userController.registerUser );
userRouter.post('/login', userController.login );
userRouter.put('/updateProfile',verificationMiddleware, userController.updateProfile );
userRouter.get('/reviews',verificationMiddleware, userController.getReviews  );

export default userRouter