import { env } from "./config/env.js";
import app from "./app.js";
import {connectDB} from "./config/db.js"


const startServer = async()=> {
    try{
        await connectDB();

        app.listen(env.PORT, ()=> {
            console.log(`app is listening on http://localhost:${env.PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

startServer()