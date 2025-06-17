import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    deviceCode : {type: String, unique: true, required: true},
    email : {type:String, required:true},
    password : {type:String, required:true},
    liveStatus : {type:String, default:"Normal"},
    alerts: [{type:Object}]
})

export const User = mongoose.model("User", userSchema);
