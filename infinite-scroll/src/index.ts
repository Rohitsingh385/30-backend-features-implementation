import  express  from "express";
import  postRoute  from "./features/post.route.js"
import { connectDB } from "./config/db.js";

const app = express()

app.use(express.json())

// app.use('/', (req,res)=> {
//     res.json('health ok')
// })

app.use("/posts", postRoute)

const startServer = async()=> {

    await connectDB();

    app.listen(3000, ()=> {
        console.log(`http://localhost:${3000}`)
    })
}
startServer()


