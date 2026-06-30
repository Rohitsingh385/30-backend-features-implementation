import App from "./app.js"
import { connectDB } from "./config/db.js"
import { env } from "./config/env.js"
const startServer = async (): Promise <void> => {
    try {
        await connectDB()

        console.log('mongoDB connected')

        App.listen(env.PORT, () => {
            console.log(`http://localhost:${env.PORT}`)
        })
    } catch (error) {
        console.log(error)
        process.exit(-1)
    }
}
startServer()