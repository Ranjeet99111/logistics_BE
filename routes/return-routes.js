import express from "express";
import _return from "../model/return.js";

import {
  createReturn,
  getAllReturn,
  getReturnById,
  updateReturn,
} from "../controller/return-controller.js";

const rRouter = express.Router();

rRouter.post("/", createReturn);
rRouter.get("/", getAllReturn);
rRouter.put("/:id", updateReturn);
rRouter.get("/:id", getReturnById);

export default rRouter;
