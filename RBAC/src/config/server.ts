import 'dotenv/config'
import mongoose from "mongoose";
console.log(process.env.PORT)
console.log(process.env.MONG_URI)
export const connectDB = async()=> {
    try{
        console.log(process.env.MONGO_URI as string)
        await mongoose.connect(process.env.MONGO_URI)
    }catch(error){
        console.log(error)
    }
}