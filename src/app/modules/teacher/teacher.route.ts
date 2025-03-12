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

// GET ALL TEACHERS
router.get("/", jwtMiddleware, TeacherControllers.getAllTeachers);

// GET A TEACHER BY ID
router.get("/:id", jwtMiddleware, TeacherControllers.getTeacherById);

// DELETE A TEACHER BY ID
router.delete("/:id", jwtMiddleware, TeacherControllers.deleteTeacherById);

// UPDATE A TEACHER BY ID
router.patch("/:id", jwtMiddleware, TeacherControllers.updateTeacherById);

export const TeacherRoutes = router;
