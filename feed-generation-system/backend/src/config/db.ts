import { env } from "./env.js";
import mongoose from "mongoose";

export const connectDB = async()=> {
    try{
        //console.log(env)
        if(!env.MONGO_URI){
           throw new Error("Missing MONGO URI")
        }
        await mongoose.connect(env.MONGO_URI)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}