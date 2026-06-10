import app from "./index.js"
import {connectDB} from "./config/db.js"

const PORT = 5000
const startServer = async()=> {
    try{
        await connectDB()

        app.listen(PORT, ()=> {
            console.log(`http://localhost:${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

startServer()