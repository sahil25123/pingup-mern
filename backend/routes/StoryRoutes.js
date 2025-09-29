
import express  from "express"
import { upload } from "../config/multer.js";
import { addUserStory, getStories } from "../controller/StoryController.js";
import { protect } from "../middleware/auth.js";

const StoryRouter = express.Router()

StoryRouter.post("/create" , upload.single("media") , protect,addUserStory)

StoryRouter.get("/get" , protect ,getStories)

export default StoryRouter;
