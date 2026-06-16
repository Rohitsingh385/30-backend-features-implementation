import {z} from "zod"

export const registerSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: 'Email is required'})
            .email('Invalid email address'),
        password: z
            .string({ required_error: 'Password is required'})
            .min(6, 'Minimum 6 chracters '),

    })
})

export const loginSchema = z.object({
    body: z.object({
        email: z 
            .string({ required_error: 'Email is required'})
            .email('Invalid email address'),
        password: z 
            .string({required_error: 'Password is required'})
    })
})

export type RegisterInput  = z.infer<typeof registerSchema>
export type loginInput = z.infer<typeof loginSchema>