import app from "./app"
import { connectDB } from "../src/config/db"
import { env } from "./config/env"

const handleServer = async ()=>{
    try {
        await connectDB()
        console.log('DB CONNECTED')
        app.listen(env.PORT, ()=> {
            console.log(`http://localhost:${env.PORT}`)
        })
    } catch (error) {
        console.log('service is down')
        process.exit(1)
    }
}

handleServer()