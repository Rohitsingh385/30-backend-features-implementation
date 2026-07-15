import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { env } from "./src/config/env.js";


const startServer = async()=> {
    try{
        await connectDB()
        console.log("Connected to DB")
        app.listen(env.PORT, ()=> {
            console.log(`http://localhost:${env.PORT}`)
        })
    }catch(error){
        console.error(error)
    }
}

startServer()