import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const student = await StudentServices.createStudent(studentData);

    res.status(201).json({
      success: true,
      message: "Student created successfully!",
      data: student,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: errorMessage,
    });
  }
};

const editStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const studentData = req.body;
    const updatedStudent = await StudentServices.editStudent(
      studentId,
      studentData
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully!",
      data: updatedStudent,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: errorMessage,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    await StudentServices.deleteStudent(studentId);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully!",
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: errorMessage,
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const classParam = req.query.class as string | undefined;

    const students = await StudentServices.getStudents(classParam);

    res.status(200).json({
      success: true,
      message: "Students retrieved successfully!",
      data: students,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to retrieve students",
      error: errorMessage,
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;

    const student = await StudentServices.getStudentById(studentId);

    res.status(200).json({
      success: true,
      message: "Student retrieved successfully!",
      data: student,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student",
      error: errorMessage,
    });
  }
};

export const StudentControllers = {
  editStudent,
  getStudents,
  createStudent,
  deleteStudent,
  getStudentById,
};
