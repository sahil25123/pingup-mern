import { discoverUsers, followUser, getUserData, UnfollowUser, updateUserData } from "../controller/userController.js";
import express from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/multer.js";

const userRouter=express.Router();


userRouter.get("/getUser" ,protect ,  getUserData)
userRouter.post("/updateUser" , upload.fields([{name :"profile" , maxCount: 1} , {name:"cover" , maxCount:1}]),protect, updateUserData)
userRouter.post("/discover" , protect, discoverUsers)

userRouter.post("/follow" , protect , followUser)

userRouter.post("/unfollow" , protect , UnfollowUser)

export default userRouter;