import dotenv from "dotenv"
dotenv.config()
import { z } from "zod"

export const envSchema = z.object({
    PORT: z.coerce.number().int(),
    MONGO_URI: z.string()
}) 

export const env = envSchema.parse(process.env)