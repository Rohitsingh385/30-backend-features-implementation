import dotenv from "dotenv"
import z from "zod"
dotenv.config()

const envSchema = z.object({
    PORT: z.string().default("3000"),
    MONGO_URI: z.string().min(1, "MONGO_URI is required")
})

export const env = envSchema.parse(process.env)