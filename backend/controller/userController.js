import User from "../models/user";


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

    }

    catch(e){
        console.log(e)
        res.json({success: false , message : e.message})
    }
}