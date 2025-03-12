import express from "express";

import { jwtMiddleware } from "../../middlewares/jwtMiddleware";

import { TeacherControllers } from "./teacher.controller";
import { TeacherValidation } from "../../validation/teacher.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE A TEACHER
router.post(
  "/create-teacher",
  validateRequest(TeacherValidation.createTeacherZodSchema),
  TeacherControllers.createTeacher
);

// TEACHER LOGIN
router.post(
  "/login",
  validateRequest(TeacherValidation.loginZodSchema),
  TeacherControllers.loginTeacher
);

// CHANGE PASSWORD
router.patch(
  "/change-password",
  jwtMiddleware,
  TeacherControllers.changePassword
);

export const TeacherRoutes = router;
