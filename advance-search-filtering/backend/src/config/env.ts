import dotenv from "dotenv"
dotenv.config()
import {z} from "zod"

const dotenvSchema = z.object({
    PORT: z
        .coerce
        .number()
        .int(),
    MONGO_URI: z    
        .string("MONGO URL is required")
})

export const env = dotenvSchema.parse(process.env)