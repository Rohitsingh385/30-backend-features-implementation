import app from "./app";
import {connectDB} from "../src/config/db"
import { env } from "./config/env";
const serverHandler = async()=> {
    try{
        await connectDB()

        app.listen(env.PORT, ()=> {
            console.log(`http://localhost:${env.PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

serverHandler()