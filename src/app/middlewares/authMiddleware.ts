import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../config";

import { TTeacherRole } from "../modules/teacher/teacher.interface";
import { Teacher } from "../modules/teacher/teacher.model";

export const authMiddleware = (...requiredRoles: TTeacherRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // console.log("token: ", token);
    // console.log("headers: ", req.headers);
    // console.log("body: ", req.body);

    // CHECK IF THE TOKEN IS PRESENT
    if (!token) {
      throw new Error("You are not authorized to access this resource!");
    }

    // CHECK IF THE TOKEN IS VALID
    try {
      const decoded = jwt.verify(token, config.jwt_access_secret) as JwtPayload;

      const role = decoded.role;

      const isTeacherExist = await Teacher.findOne({
        email: decoded.email,
      });

      console.log("IS TEACHER EXIST: ", isTeacherExist);

      if (!isTeacherExist) {
        throw new Error("Teacher not found");
      }

      // CHECK IF THE TEACHER IS DELETED
      const isDeleted = isTeacherExist?.isDeleted;

      if (isDeleted) {
        throw new Error("Teacher is deleted");
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new Error("You are not authorized to access this resource!");
      }

      req.teacher = decoded;
      next();
    } catch (err) {
      throw new Error("You are not authorized to access this resource!");
    }
  };
};
