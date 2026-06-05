import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/likes')
        console.log('db connected')
    }catch(error){
        console.error(error);
    }
} 