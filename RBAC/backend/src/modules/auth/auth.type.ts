export const ROLES = {
    USER: "USER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES]