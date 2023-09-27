import express from "express"

import Order from "../model/order.js"
import { createOrder, getAllOrders, getOrderById, updateOrder } from "../controller/order-controller.js";

const oRouter= express.Router();

oRouter.post("/",createOrder);
oRouter.get("/",getAllOrders);
oRouter.put("/:id",updateOrder);
oRouter.get("/:id",getOrderById);

export default oRouter;