import cartController from "../../controller/cart/index.js";
import express from 'express'
import { verificationMiddleware } from "../../middleware/auth/index.js";

const cartRouter = express.Router();

cartRouter.post('/addItem/:id/:qty',verificationMiddleware, cartController.addItem )
cartRouter.post('/removeItem/:id', verificationMiddleware, cartController.removeItem )
cartRouter.post('/updateItem/:id/:qty', verificationMiddleware, cartController.updateItem )
export default cartRouter

// 65435d24eec88d4f2ddcd14d 2