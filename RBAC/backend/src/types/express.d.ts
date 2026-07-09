import type { Role } from "../modules/auth/auth.type.ts";

declare global {
    namespace Express {
        interface Request {
            uuser:? {
                id: string;
                role: Role;
            }
        }
    }
}

export {}