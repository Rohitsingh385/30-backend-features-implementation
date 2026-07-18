import {z} from "zod"

export const bookmarkParseSchema = z.object({
        postId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID")
})

export type bookmarkParseInput = z.infer<typeof bookmarkParseSchema>