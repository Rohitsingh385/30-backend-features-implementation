import 'dotenv/config'
import mongoose from "mongoose";
export const connectDB = async()=> {
    try{
        const uri = process.env.MONGO_URI
        if(!uri) throw new Error("MOONGO DB URI IS NOT DEFINED IN .env")
        await mongoose.connect(uri)
    }catch(error){
        console.log(error)
    }
}