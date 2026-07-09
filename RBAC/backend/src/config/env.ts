import dotenv from "dotenv"
dotenv.config()

import {z} from "zod"

const envSchema = z.object({
    PORT: z 
        .coerce
        .number()
        .int(),
    MONGO_URI: z 
        .string("Mongo URI REQUIRED")
        .trim(),
    JWT_SECRET: z   
        .string("JWT SECRET REQUIRED")
        .trim(),
    FRONTEND_URL: z
        .string("FRONTEND URL REQUIRED")
        .trim()
})

export const env = envSchema.parse(process.env)