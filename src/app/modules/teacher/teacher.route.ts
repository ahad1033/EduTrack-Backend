import express from "express";

import { jwtMiddleware } from "../../middlewares/jwtMiddleware";
import { UserValidation } from "../../validation/user.validation";

import validateRequest from "../../middlewares/validateRequest";
import { TeacherControllers } from "./teacher.controller";

const router = express.Router();

// CREATE A TEACHER
router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  TeacherControllers.createTeacher
);

// TEACHER LOGIN
router.post(
  "/login",
  validateRequest(UserValidation.loginZodSchema),
  TeacherControllers.loginTeacher
);

// CHANGE PASSWORD
router.patch(
  "/change-password",
  jwtMiddleware,
  TeacherControllers.changePassword
);

export const TeacherRoutes = router;
