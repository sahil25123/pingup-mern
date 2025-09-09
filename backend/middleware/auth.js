export const protect = async (req , res , next)=>{

    try{
        const {userId} = await req.auth();

        if(!userId){
            return res.json({success : false , message :"Not Authenticated"})
        }
        next();
    }
    catch(e){
        res.json({message : e.message, success: false}  )

    }


}