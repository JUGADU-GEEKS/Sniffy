import { User } from '../models/User.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register=async(req,res)=>{
    const {deviceCode, email, password} = req.body;
    try{
        if(!deviceCode || !email || !password){
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            deviceCode,
            email,
            password: hashedPassword
        })  
        return res.status(201).json({
                message: "Account Created Succesfully",
                success: true
        })
    }catch(e){
        console.log(e.message)
    }
}

export const login=async(req,res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User Not Found, Signup !",
                success: false
            })
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched){
            return res.status(400).json({
                message: "Something is wrong",
                success: false
            })
        }
        const tokenData = {
            userid: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:'15d'})
        user={
            _id:user._id,
            email:user.email,
            deviceCode:user.deviceCode
        }
        return res.status(200).cookie("token", token, {maxAge:15*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            message:`Welcome back`,
            user,
            success: true
        })
    }catch(e){
        console.log(e.message);
        
    }
}