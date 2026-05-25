import app from './app.js'
import { ConnectDB, connectDB } from "./lib/db.js"
import { env } from "./config/env.js"


const startServer = async()=> {
    await ConnectDB();

    app.listen(env.PORT, ()=> {
        console.log(`http://localhost:${env.PORT}`);
        
    })
}
startServer()