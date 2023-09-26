import express from "express"

import Order from "../model/order.js"
import { createOrder, getAllOrders, updateOrder } from "../controller/order-controller.js";

const oRouter= express.Router();

oRouter.post("/",createOrder);
oRouter.get("/",getAllOrders);
oRouter.put("/:id",updateOrder);

export default oRouter;