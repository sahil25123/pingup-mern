import imagekit from "../config/imagekit";
import User from "../models/user";
import fs from "fs";


//Get user  data using userId

export const getUserData = async (req, res) =>{
    try{
        const {userId} = await req.auth();
        const user  = await User.findById(userId);

        if(!user){
            return res.json({success : false , message :"User not foound"})
        }
        res.json({success:true , user})

    }

    catch(e){
        console.log(e)
        res.json({success: false , message : e.message})
    }
}


export const updateUserData = async (req, res) =>{
    try{
        const {userId} = await req.auth();

        const {username , bio , location , full_name } = req.body


        const tempUser  = await User.findById(userId);

        if(tempUser.username !== username){
            const user = User.findOne({username})
        
            !username && (username =tempUser.username)

            if(user){
                //We will not change the username as it is already taken
                username = tempUser.username
            }
        }

        const updatedData ={
            username , 
            bio,
            location, 
            full_name
        }

        const profile = req.files.profile &&req.files.profile[0]
        const cover = req.files.cover &&req.files.cover[0]
        
        if(profile){
            const buffer = fs.readFileSync(profile.path)
            const respone = await imagekit.upload({
                file : buffer,
                fileName: profile.originalName
            })
            const url=imagekit.url({
                path: respone.filePath,
                transformation :[
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '512'}
                ]
            })
            updatedData.profile_picture = url;
        }
        if(cover){
            const buffer = fs.readFileSync(cover.path);
            const response = await imagekit.upload({
                file: buffer,
                fileName: profile.originalname
            });

            const url = imagekit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '1280'}
                ]
            })

            updatedData.cover_photo = url;
        }

        const user = await User.findByIdAndUpdate(userId , updatedData , {new : true})
        res.json({ success: true, user, message: 'Profile updated successfully' });
    }

    catch(e){
        console.log(e)
        res.json({success: false , message : e.message})
    }
}