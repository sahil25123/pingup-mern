import mongoose from "mongoose";

const connect= async() =>{

    try{
         mongoose.connection.on("connected", ()=>{
        console.log("Database Connected")
    })
     await mongoose.connect(`${process.env.MONGO_URI}/squadup`)
    }
    catch(e){
        console.log("Error in the Database Connection" , e.message)
    }

}

export default connect;

   