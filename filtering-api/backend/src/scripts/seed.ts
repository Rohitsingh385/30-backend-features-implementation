import { faker } from "@faker-js/faker"
import { connectDB } from "../config/db"
import { Product } from "../modules/products/product.model"

const categories = [
    "phone",
    "laptop",
    "tablet",
    "camera",
    "watch",
    "headphone"
];

const brands = [
    "apple",
    'samsung',
    "sony",
    "dell",
    "hp",
    "lenovo",
    "acer",
    "avita"
]

const seedHandler = async () => {
    try {
        await connectDB()
        console.log('Db connected')

        await Product.deleteMany()

        console.log('document cleaned')

        const Products = []

        for (let i = 0; i < 1000; i++) {
            Products.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                category: faker.helpers.arrayElement(categories),
                brand: faker.helpers.arrayElement(brands),
                price: faker.number.int({ min: 5000, max: 200000 }),
                rating: Number(
                    faker.number.float({
                        min: 1,
                        max: 5,
                        fractionDigits: 1,
                    })
                ),
                stock: faker.number.int({ min: 0, max: 500 }),
                discount: faker.number.int({ min: 0, max: 50 }),
                isPublished: faker.datatype.boolean({ probability: 0.9 })
            })
        }

        console.log('product array is ready ')

        await Product.insertMany(Products)

        console.log(`${Products.length} products inserted`)
        process.exit(1)

    } catch (error) {
        console.log('something went wrong while seeding')
        process.exit(1)
    }
}

seedHandler()