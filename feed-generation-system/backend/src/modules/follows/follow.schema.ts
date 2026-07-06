import {z} from "zod"

export const followUserSchema = z.object({
    id: z   
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
})

export type FollowUserParams = z.infer<typeof followUserSchema>