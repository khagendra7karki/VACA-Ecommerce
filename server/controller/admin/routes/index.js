import adminController from '../Controller/index.js';
import express from 'express'
import { verificationMiddleware } from "../../../middleware/auth/index.js";

const adminRouter = express.Router();

adminRouter.post('/login', adminController.login )
// adminRouter.post('/addItem/:id/:qty',verificationMiddleware, adminController.addItem )
// adminRouter.post('/removeItem/:id', verificationMiddleware, adminController.removeItem )
// adminRouter.post('/updateItem/:id/:qty', verificationMiddleware, adminController.updateItem )
// adminRouter.delete('/clearadmin', verificationMiddleware, adminController.clearadminItems )

export default adminRouter