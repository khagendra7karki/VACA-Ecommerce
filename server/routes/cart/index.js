import cartController from "../../controller/cart/index.js";
import express from 'express'
import { verificationMiddleware } from "../../middleware/auth/index.js";

const cartRouter = express.Router();

cartRouter.post('/addItem/:id/:qty',verificationMiddleware, cartController.addItem )
cartRouter.post('/removeItem', verificationMiddleware, cartController.removeItem )

export default cartRouter