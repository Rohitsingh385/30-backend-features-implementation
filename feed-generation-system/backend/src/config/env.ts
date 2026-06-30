import dotenv from 'dotenv'
dotenv.config()
import {z} from "zod"

const envSchema = z.object({
    PORT: z.string(),
    JWT_SECRET:  z.string(),
    MONGO_URI: z.string(),
})

export const env = envSchema.parse(process.env)