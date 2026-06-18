import { TokenPayload } from "../auth/util.token.js";
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}