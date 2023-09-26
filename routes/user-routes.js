import mongoose from "mongoose";
import express from "express";
import user from "../model/user.js";
import { getAllUser, signup, updateUser } from "../controller/user-controller.js";



const router = express.Router();

router.post("/register",signup);
router.get("/",getAllUser);
router.put("/:id",updateUser);


export default router;
