import { env } from "./env.js"
import mongoose from "mongoose"

export const connectDB = async() => {
    try{
        await mongoose.connect(env.MONGO_URI)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}