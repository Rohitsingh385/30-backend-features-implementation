import express from "express"
import Product from "./modules/products/product.routes.js"
const app = express()


app.use(express.json())

app.use("/api/v1/", Product)

export default app