import fs from "fs";
import imagekit from "../config/imagekit";
import Story from "../models/Story";
import { User } from "@clerk/express";


//Add user Story 

export const addUserStory = async (req, res) =>{
    try{

        const {userId} = req.auth();
        const {content , media_type , background_colour} = req.body;

        const media = req.file 
        let media_url = ""
         
        //Upload media to imagekit

        if(media_type == "image" || media_type =="video"){
            const fileBuffer = fs.readFileSync(media.path);
            const response = await imagekit.upload({
                file: fileBuffer, 
                fileName : media.originalname,
            
            })
            media_url = response.url;

            //create Story 
            const story = await Story.create({
                user: userId , 
                content , 
                media_url, 
                media_type,
                background_colour , 

            })

            res.json({success: true , story })
        }

    }
    catch(e){
        console.log(e)
        res.json({success : false , message : e.message})

    }
}



//getStory 

export const getStories =async (req, res)=>{
     try {
        const { userId } = req.auth();
        const user = await User.findById(userId);

        // User connections and followings
        const userIds = [userId, ...user.connections, ...user.following];

        const stories = await Story.find({
            user: {$in: userIds}
        }).populate('user').sort({ createdAt: -1 });

        res.json({ success: true, stories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }


}