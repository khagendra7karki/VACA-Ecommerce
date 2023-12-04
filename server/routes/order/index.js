import express from "express";
const orderRouter = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../../controller/order/index.js";
//import { protect, admin } from "../middleware/authMiddleware";
import { verificationMiddleware } from '../../middleware/auth/index.js'

orderRouter.route("/").post( verificationMiddleware, addOrderItems).get( verificationMiddleware, getOrders);
orderRouter.route("/myorders").get( verificationMiddleware,  getMyOrders);
orderRouter.route("/:id").get( verificationMiddleware, getOrderById);
orderRouter.route("/:id/pay").put( verificationMiddleware, updateOrderToPaid);
orderRouter.route("/:id/deliver").put( verificationMiddleware, updateOrderToDelivered);

export default orderRouter;
