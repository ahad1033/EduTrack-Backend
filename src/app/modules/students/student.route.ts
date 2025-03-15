import express from "express";

import { StudentControllers } from "./student.controller";
import { TEACHERS_ROLE } from "../teacher/teacher.constant";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { StudentValidation } from "../../validation/student.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE A STUDENT
router.post(
  "/create-student",
  authMiddleware(TEACHERS_ROLE.super_admin, TEACHERS_ROLE.teacher),
  validateRequest(StudentValidation.createStudentZodSchema),
  StudentControllers.createStudent
);

// EDIT A STUDENT
router.patch(
  "/edit-student/:id",
  authMiddleware(TEACHERS_ROLE.super_admin, TEACHERS_ROLE.teacher),
  validateRequest(StudentValidation.editStudentZodSchema),
  StudentControllers.editStudent
);

// DELETE A STUDENT
router.delete(
  "/delete-student/:id",
  authMiddleware(TEACHERS_ROLE.super_admin, TEACHERS_ROLE.teacher),
  StudentControllers.deleteStudent
);

// GET ALL STUDENTS
router.get(
  "/get-all-students",
  authMiddleware(TEACHERS_ROLE.super_admin, TEACHERS_ROLE.teacher),
  StudentControllers.getStudents
);

// GET A STUDENT BY ID
router.get(
  "/get-single-student/:id",
  authMiddleware(TEACHERS_ROLE.super_admin, TEACHERS_ROLE.teacher),
  StudentControllers.getStudentById
);

export const StudentRoutes = router;
