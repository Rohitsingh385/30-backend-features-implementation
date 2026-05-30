import express from "express"
import { connectDB } from "./config/db.js";
import commentroute from "./features/comment.route.js"
const app = express();


app.use(express.json())


app.use('/api/v1/', commentroute)

const startserver = async()=>{
     await connectDB()

     app.listen(3000, ()=> {
        console.log(`http://localhost:3000`)
     })
}
startserver();
