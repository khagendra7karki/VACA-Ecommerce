import express from 'express'
import { verificationMiddleware } from "../../middleware/auth/index.js";
import wishListController from "../../controller/wishList/index.js";

const wishListRouter = express.Router();

wishListRouter.get('/getItem', verificationMiddleware, wishListController.getItem)
wishListRouter.post('/addItem/:id',verificationMiddleware, wishListController.addItem )
wishListRouter.delete('/removeItem/:id', verificationMiddleware, wishListController.removeItem )

export default wishListRouter