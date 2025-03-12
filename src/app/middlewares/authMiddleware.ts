import { Request, Response, NextFunction } from "express";

export const authMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (user && user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
  };
};
