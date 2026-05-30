import mongoose from "mongoose";

export const connectDB = async()=> {
    try{
        await mongoose.connect('mongodb://localhost:27017/nested-comment')
        console.log('db connected')
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}