import mongoose from "mongoose";

export const connectDB = async()=> {
    try{
        await mongoose.connect("mongodb://localhost:27017/posts");
        console.log('mongodb connected');
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}