import { getUserData } from "../controller/userController.js";
import express from "express";

const userRouter=express.Router();


userRouter.get("/get" , getUserData)

export default userRouter;