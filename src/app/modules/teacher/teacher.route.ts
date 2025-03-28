import express from "express";

import { TEACHERS_ROLE } from "./teacher.constant";
import { TeacherControllers } from "./teacher.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { TeacherValidation } from "../../validation/teacher.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE A TEACHER
router.post(
  "/create-teacher",
  authMiddleware(TEACHERS_ROLE.super_admin),
  validateRequest(TeacherValidation.createTeacherZodSchema),
  TeacherControllers.createTeacher
);

// GET ALL TEACHERS
router.get(
  "/get-all-teachers",
  authMiddleware(TEACHERS_ROLE.teacher, TEACHERS_ROLE.super_admin),
  TeacherControllers.getAllTeachers
);

// GET A TEACHER BY ID
router.get(
  "/get-single-teacher/:id",
  authMiddleware(TEACHERS_ROLE.super_admin),
  TeacherControllers.getTeacherById
);

// DELETE A TEACHER BY ID
router.delete(
  "/delete-teacher/:id",
  authMiddleware(TEACHERS_ROLE.super_admin),
  TeacherControllers.deleteTeacherById
);

// UPDATE A TEACHER BY ID
router.patch(
  "/update-teacher/:id",
  authMiddleware(TEACHERS_ROLE.super_admin),
  TeacherControllers.updateTeacherById
);

export const TeacherRoutes = router;
