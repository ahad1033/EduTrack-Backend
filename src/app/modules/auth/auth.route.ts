import express from "express";

import { AuthValidation } from "../../validation/auth.validation";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { TEACHERS_ROLE } from "../teacher/teacher.constant";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginTeacherSchema),
  AuthController.loginTeacher
);

router.post(
  "/change-password",
  authMiddleware(TEACHERS_ROLE.teacher),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
