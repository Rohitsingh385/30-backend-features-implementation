import { connectDB } from "./config/db.js"
import app from "./app.js"

const startServer = async () => {
    try {
        await connectDB();
        console.log('db connected')
        app.listen(3000, () => {
            console.log(`http://localhost:3000`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();