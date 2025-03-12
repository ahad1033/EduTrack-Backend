import mongoose from "mongoose";

import { Student } from "./student.model";
import { IStudent } from "./student.interface";

const createStudent = async (studentData: IStudent) => {
  try {
    // Check if email exists in studentData
    if (studentData.email) {
      // Check if the email already exists in the database
      const existingStudent = await Student.findOne({
        email: studentData.email,
      });
      if (existingStudent) {
        throw new Error("Email already exists");
      }
    }

    // CREATE STUDENT
    const student = new Student(studentData);
    return await student.save();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to create student: " + error.message);
    } else if (error instanceof mongoose.Error.ValidationError) {
      throw new Error("Validation error: " + error.message);
    } else {
      throw new Error("Failed to create student: Unknown error");
    }
  }
};

const editStudent = async (id: string, studentData: Partial<IStudent>) => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error("Student not found");
    }

    // Update student data
    Object.assign(student, studentData);
    return await student.save();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to edit student: " + error.message);
    } else if (error instanceof mongoose.Error.ValidationError) {
      throw new Error("Validation error: " + error.message);
    } else {
      throw new Error("Failed to edit student: Unknown error");
    }
  }
};

const deleteStudent = async (id: string) => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error("Student not found");
    }

    // Soft delete by setting isDelete to true
    student.isDeleted = true;
    return await student.save();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to delete student: " + error.message);
    } else {
      throw new Error("Failed to delete student: Unknown error");
    }
  }
};

const getStudents = async (classParam?: string) => {
  try {
    const query: any = { isDeleted: false };
    if (classParam) {
      query.class = classParam;
    }
    return await Student.find(query);
  } catch (error: unknown) {
    throw new Error(
      "Failed to retrieve students: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

const getStudentById = async (id: string) => {
  try {
    const student = await Student.findById(id);
    if (!student || student.isDeleted) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to retrieve student: " + error.message);
    } else {
      throw new Error("Failed to retrieve student: Unknown error");
    }
  }
};

export const StudentServices = {
  editStudent,
  getStudents,
  deleteStudent,
  createStudent,
  getStudentById,
};
