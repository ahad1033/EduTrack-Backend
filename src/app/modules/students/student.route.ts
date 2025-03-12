import express from "express";

import { jwtMiddleware } from "../../middlewares/jwtMiddleware";

import validateRequest from "../../middlewares/validateRequest";

import { StudentControllers } from "./student.controller";
import { StudentValidation } from "../../validation/student.validation";

const router = express.Router();

// CREATE A STUDENT
router.post(
  "/create-student",
  validateRequest(StudentValidation.createStudentZodSchema),
  StudentControllers.createStudent
);

// EDIT A STUDENT
router.patch(
  "/student/:id",
  jwtMiddleware,
  validateRequest(StudentValidation.editStudentZodSchema),
  StudentControllers.editStudent
);

// DELETE A STUDENT
router.delete("/student/:id", jwtMiddleware, StudentControllers.deleteStudent);

// GET ALL STUDENTS
router.get("/", jwtMiddleware, StudentControllers.getStudents);

// GET A STUDENT BY ID
router.get("/:id", jwtMiddleware, StudentControllers.getStudentById);

export const StudentRoutes = router;
