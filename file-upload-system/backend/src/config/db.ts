import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

export const connectDB = async()=> {
    try{

        if(!process.env.MONGO_URI){
            throw new Error("Mongo URI is required")
        }
        await mongoose.connect(process.env.MONGO_URI)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}