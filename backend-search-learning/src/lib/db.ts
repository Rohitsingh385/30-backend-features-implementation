import mongoose from "mongoose";

import {env} from "../config/env.js"

export const ConnectDB = async()=> {
    try{
        await mongoose.connect(env.MONGO_URI)
        console.log('mongodb connected')
    }catch(err){
        console.error("db connection failed", err)
        process.exit(1);
    }
}