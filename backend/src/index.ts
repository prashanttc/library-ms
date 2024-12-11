import  Express,{Request,Response}  from "express";
 import "dotenv/config";
 import mongoose from "mongoose"
 import cors from 'cors';
 import cookieParser from "cookie-parser";
 import userRoute from "./routes/UserRoute"


 mongoose.connect(process.env.MONGO as string).then(()=>console.log("connected to the database"))
 const app = Express()
 app.use(Express.json());
 app.use(cookieParser());
 app.use(cors({
   origin: 'http://localhost:5173', 
   credentials: true, 
 }));


 app.get("/health", async(req: Request, res: Response)=>{
    res.json({message:"health OK!!"})
    })

 app.use("/api/user", userRoute)   

 app.listen(8000,()=>{
    console.log("server is running on port 8000")
 })