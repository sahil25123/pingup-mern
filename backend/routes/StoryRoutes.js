
import express  from "express"
import { upload } from "../config/multer";
import { addUserStory, getStories } from "../controller/StoryController";
import { protect } from "../middleware/auth";

const StoryRouter = express.Router()

StoryRouter.post("/create" , upload.single("media") , protect , addUserStory)

StoryRouter.get("/get" , protect , getStories)

export default StoryRouter;
