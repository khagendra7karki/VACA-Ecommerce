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

orderRouter.route("/").post( addOrderItems).get( getOrders);
orderRouter.route("/myorders").get( getMyOrders);
orderRouter.route("/:id").get( getOrderById);
orderRouter.route("/:id/pay").put( updateOrderToPaid);
orderRouter.route("/:id/deliver").put( updateOrderToDelivered);

export default orderRouter;
