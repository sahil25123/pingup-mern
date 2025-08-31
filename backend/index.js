import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const PORT=9000;

const app= express();

app.use(express.json());
app.use(cors());

app.get("/" , (req, res)=>{
    res.send("Server is running")
})

app.listen(PORT , ()=>{

    console.log("ruuning on port " , PORT)
})



