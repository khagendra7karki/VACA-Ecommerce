import cartController from "../../controller/cart/index.js";
import express from 'express'


const cartRouter = express.Router();

cartRouter.post('/addItem', cartController.addItem )
cartRouter.post('/removeItem', cartController.removeItem )

export default cartRouter