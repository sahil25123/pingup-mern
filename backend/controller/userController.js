import imagekit from "../config/imagekit.js";
import Connection from "../models/connection.js";
import User from "../models/user.js";
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

        let {username , bio , location , full_name } = req.body


        const tempUser  = await User.findById(userId);

        if(tempUser.username !== username){
            const user = await User.findOne({username})
        
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
                fileName: profile.originalname
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

// Find users using username, email, location, name
export const discoverUsers = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { input } = req.body;

        const allUsers = await User.find(
            {
                $or: [
                    {username: new RegExp(input, 'i')},
                    {email: new RegExp(input, 'i')},
                    {full_name: new RegExp(input, 'i')},
                    {location: new RegExp(input, 'i')},
                ]
            }
        );

        const filteredUsers = allUsers.filter(user => user._id !== userId);

        res.json({ success: true, users: filteredUsers });
    } 
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Follow User 

export const followUser = async (req, res) =>{
    try{
        const {userId} = await req.auth();// logggesd in usrer daata
        const {id} =req.body;

        const user = await findById(userId);

        if(user.following.includes(id)){
            return res.json({ success: false, message: 'You are already following this user' });
        }
         user.following.push(id);
        await user.save();

        const toUser = await User.findById(id);
        toUser.followers.push(userId);
        await toUser.save();

        res.json({ success: true, message: 'Now you are following this user' });
     }

    catch(e){
        console.log(e)
        res.json({success: false , message : e.message})
    }
}


//Unfollow User

export const UnfollowUser = async (req, res) =>{
    try{
        const {userId} = await req.auth();// logggesd in usrer daata
        const {id} =req.body;

        const user = await findById(userId);

        user.following = user.following.filter(user => user!==id)
        await user.save();


        const toUser = await findById(id)
        toUser.followers = toUser.followers.filter(user =>user!== userId)

        await toUser.save();

        res.json({success:true , message : "You have unfollow the user"})
     }

    catch(e){
        console.log(e)
        res.json({success: false , message : e.message})
    }
}


//Send Connection Request

export const sendConnectionRequest = async(req , res) =>{
    try{

        const {userId} = req.auth();

        const {id} = req.body;


        const last24hours =  new Date(Date.now() - 24*60*60*1000)

        const connectionReq24 = await Connection.find({from_user_id : userId ,
            createdAt : {$gt :last24hours} // check if sended connection req is from last 24 hours
        })

        if(connectionReq24.length >20){
            res.json({success : false , message : "You have send more than 20 connections req in last 24  hours"})
        }

        const connection = await Connection.findOne({

            $or  : [
                {rom_user_id : userId , to_user_id : id},
                {rom_user_id : id , to_user_id :userId}
            ]

            
        })
        if(!connection){
            await Connection.create({
                from_user_id : userId,
                to_user_id :id
            })
            return res.json({success : true , message :"Connection Request Sent"})
        }

        else if(connection && connection.status === "accepted"){
            return res.json({success : true , message :"You are already Connected "})

        }
        return res.json({success : true , message :"Connection Request Pending"})

    }
    catch(e){
        console.log("Error in the Send Connection Request")
        res.status(401).json({success : false , message : e.message})
    }

}

//Get User Connections 

export const getUserConnections = async(req , res) =>{
    try{

        const {userId} = req.auth();
        
        const user = await User.findById(userId).populate("connections followers following")
        
        const connections = user.connections;
        const followers = user.followers;
        const following = user.following;

        const pendingConnections = (await Connection.find({to_user_id :userId  , status :"pending"}).populate("from_user_id")).map(connection => connection.from_user_id)

         res.json({ success: true, connections, followers, following, pendingConnections });
    }
    catch(e){
        console.log(e);
        res.status(401).json({success : false , message : e.message})
    }
}

export const acceptConnectionRequest = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;
        
        const connection = await Connection.findOne({ from_user_id: id, to_user_id: userId });

        if(!connection) {
            return res.json({ success: false, message: 'Connection not found' });
        }

        const user = await User.findById(userId);
        user.connections.push(id);
        await user.save();

        const toUser = await User.findById(id);
        toUser.connections.push(userId);
        await toUser.save();

        connection.status = 'accepted';
        await connection.save();

        res.json({ success: true, message: 'Connection accepted successfully' });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// Get User Profiles
export const getUserProfiles = async (req, res) => {
    try {
        const { profileId } = req.body;
        const profile = await User.findById(profileId);
        if(!profile) {
            return res.json({ success: false, message: "Profile not found" });
        }
        const posts = await Post.find({ user: profileId }).populate('user');
        res.json({ success: true, profile, posts });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}