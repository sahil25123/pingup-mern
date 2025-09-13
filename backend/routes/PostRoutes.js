import express from "express";
import { addPost, getFeedPosts, likePost } from "../controller/PostController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/multer.js";


const postRouter = express.Router()

postRouter.post("/add" , upload.array("images" ,4) ,  protect , addPost);
postRouter.get("/feed" , protect , getFeedPosts);
postRouter.post("/like" , protect , likePost);





export default postRouter;
