import mongoose from "mongoose"
import {env} from "./env"

export const connectDB = async()=> {
    try{
        await mongoose.connect(env.MONGO_URI)
    }catch(error){
        console.log("MONGO DB CONNECTION FAILED",error)
        process.exit(1)
    }
}