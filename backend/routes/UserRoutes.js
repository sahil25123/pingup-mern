import {
  acceptConnectionRequest,
  discoverUsers,
  followUser,
  getUserConnections,
  getUserData,
  getUserProfile,
  getUserProfiles,
  sendConnectionRequest,
  UnfollowUser,
  updateUserData,
} from "../controller/userController.js";
import express from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/getUser", protect, getUserData);
userRouter.post(
  "/updateUser",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  protect,
  updateUserData
);
userRouter.post("/discover", protect, discoverUsers);

userRouter.post("/follow", protect, followUser);

userRouter.post("/unfollow", protect, UnfollowUser);

userRouter.post("/connect", protect, sendConnectionRequest);

userRouter.post("/accept", protect, acceptConnectionRequest);

userRouter.get("/connections", protect, getUserConnections);
userRouter.post("/profile", protect, getUserProfiles);

export default userRouter;
