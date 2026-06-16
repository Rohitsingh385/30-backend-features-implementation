import { JwtPayload } from "../auth/util.token.ts";
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}