import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import {clerkMiddleware} from "@clerk/express";
import userRouter from "./routes/UserRoutes.js";
import postRouter from "./routes/PostRoutes.js";


dotenv.config()

const PORT=9000;

const app= express();

await connect(); //Database Connection config

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());


app.use("/api/user",userRouter)
app.use("/api/post" , postRouter);

app.get("/" , (req, res)=>{
    res.send("Server is running")
})

app.use("/api/inngest" ,serve({client : inngest , functions}))

app.listen(PORT , ()=>{

    console.log(`Server Running on the Port ${PORT}`)
})



