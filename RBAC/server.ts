import 'dotenv/config'
import { connectDB } from "./src/config/server.js"
import app from "./src/index.js"

const serverHandler = async()=> {
    try{
        await connectDB()
        console.log("DB CONNECTED")
        app.listen(`http://localhost:${process.env.PORT}`)
    }catch(error){
        console.log(error)
    }
}
serverHandler()