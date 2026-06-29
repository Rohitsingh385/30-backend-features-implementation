import mongoose from "mongoose";

export const connectDB = async()=> {
    try{
        await mongoose.connect()
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}