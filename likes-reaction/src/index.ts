import  express  from "express";
import { connectDB } from "./config/db.js";

const app = express();

const startServer = async()=> {
    try{
        await connectDB();

        app.listen(3000, ()=> {
            console.log(`http://localhost:3000`)
        })
    }catch(error){
        console.log(error)
    }
}
startServer()