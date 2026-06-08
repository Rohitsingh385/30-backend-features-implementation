import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .min(4),
    email: z
        .email()
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(6)
        .max(20)

})

export const loginSchema = z.object({
    email: z
        .email()
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(6)
        .max(20)

})