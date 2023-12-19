import adminController from '../Controller/index.js';
import express from 'express'
import { verificationMiddleware } from "../../../middleware/auth/index.js";

const adminRouter = express.Router();

adminRouter.post('/login', adminController.login )

export default adminRouter