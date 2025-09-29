import fs from "fs";
import imagekit from "../config/imagekit.js";
import Story from "../models/Story.js";
import User from "../models/user.js";
import { inngest } from "../inngest/index.js";

// Add user Story 
export const addUserStory = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {content, media_type, background_color} = req.body; 

        if(!media_type || !['text', 'image', 'video'].includes(media_type)) {
            return res.status(400).json({success: false, message: "Invalid media type"});
        }

        if(media_type === "text" && !content) {
            return res.status(400).json({success: false, message: "Content is required for text stories"});
        }

        const media = req.file;
        let media_url = "";
         
        if(media_type === "image" || media_type === "video") {
            // ✅ Check if media file exists
            if(!media) {
                return res.status(400).json({success: false, message: "Media file is required"});
            }

            try {
                const fileBuffer = fs.readFileSync(media.path);
                const response = await imagekit.upload({
                    file: fileBuffer, 
                    fileName: media.originalname,
                });
                media_url = response.url;

                //Clean up temporary file
                fs.unlinkSync(media.path);
            } catch (uploadError) {
                // ✅ Clean up file even if upload fails
                if(media && media.path && fs.existsSync(media.path)) {
                    fs.unlinkSync(media.path);
                }
                throw new Error(`Failed to upload media: ${uploadError.message}`);
            }
        }

        // Create story outside the if block (for all types)
        const story = await Story.create({
            user: userId, 
            content, 
            media_url, 
            media_type,
            background_color, 
        });

        // Schedule story deletion after 24 hours
        //   await inngest.send({
        //     name: 'app/story.delete',
        //     data: { storyId: story._id }
        // });
        
        return res.json({success: true, story}); 

    } catch(e) {
        console.log("Error in addUserStory:", e);
        return res.status(500).json({success: false, message: e.message}); 
    }
}

// Get Stories
export const getStories = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        // User connections and followings
        const userIds = [userId, ...user.connections, ...user.following];

        const stories = await Story.find({
            user: {$in: userIds}
        }).populate('user').sort({ createdAt: -1 });

        return res.json({ success: true, stories }); 

    } catch (error) {
        console.log("Error in getStories:", error);
        return res.status(500).json({ success: false, message: error.message }); 
    }
}