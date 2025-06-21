import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db.js";

import userRouter from './routes/user.routes.js'
import alertRouter from './routes/alert.routes.js'

const app = express();
const port = process.env.PORT || 4001;
const corsOptions = {
    origin: '*',
}

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors(corsOptions))

app.get("/", (req,res)=>{
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    })
})

app.use('/user', userRouter)
app.use('/alert', alertRouter)

app.listen(port, ()=>{
    connectDB();
    console.log(`Listening to port ${port}`);
    
})