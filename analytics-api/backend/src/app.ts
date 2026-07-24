import express from "express"
import categoryRoute from "./modules/category/category.routes"
import productRoute from "./modules/product/product.route"
import reviewRoute from "./modules/review/review.routes"
const app = express()

app.use(express.json())

app.use('/api/v1/category/', categoryRoute)
app.use('/api/v1/product/', productRoute)
app.use('/api/v1/review/', reviewRoute)

export default app