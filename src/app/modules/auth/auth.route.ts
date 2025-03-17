import express from "express";

import { AuthController } from "./auth.controller";
import { TEACHERS_ROLE } from "../teacher/teacher.constant";
import { AuthValidation } from "../../validation/auth.validation";
import { authMiddleware } from "../../middlewares/authMiddleware";

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

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
