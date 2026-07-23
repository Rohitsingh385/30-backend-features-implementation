import express from "express"
import productRoute from "../src/modules/products/product.route"
const app = express()


app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        messge: 'health ok'
    })
})

app.use('/api/v1/products', productRoute)
export default app;