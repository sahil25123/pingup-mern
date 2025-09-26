import {
  acceptConnectionRequest,
  discoverUsers,
  followUser,
  getUserConnections,
  getUserData,
  getUserProfiles,
  sendConnectionRequest,
  UnfollowUser,
  updateUserData,
} from "../controller/userController.js";
import express from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/data", protect, getUserData);
userRouter.post(
  "/update",
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

// userRouter.get('/recent-messages', protect, getUserRecentMessages);

export default userRouter;
