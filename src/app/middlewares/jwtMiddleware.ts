import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { TUserRole } from "../constants";
import config from "../config";

interface DecodedUser {
  userId: string;
  email: string;
  role: TUserRole;
}

export const jwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Return a response and stop further execution
    res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret) as DecodedUser;

    // Attach the decoded user information to the request object
    req.user = decoded;

    next();
  } catch (error) {
    // Return a response and stop further execution
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
    return;
  }
};
