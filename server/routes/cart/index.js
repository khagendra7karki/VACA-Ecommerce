import cartController from "../../controller/cart/index.js";
import express from 'express'
import { verificationMiddleware } from "../../middleware/auth/index.js";

const cartRouter = express.Router();

cartRouter.get('/getItem', verificationMiddleware, cartController.getItem )
cartRouter.post('/addItem/:id/:qty',verificationMiddleware, cartController.addItem )
cartRouter.post('/removeItem/:id', verificationMiddleware, cartController.removeItem )
cartRouter.post('/updateItem/:id/:qty', verificationMiddleware, cartController.updateItem )
cartRouter.delete('/clearCart', verificationMiddleware, cartController.clearCartItems )

export default cartRouter