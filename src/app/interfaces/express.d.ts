import { USER_ROLE } from "../constants";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
      };
    }
  }
}
