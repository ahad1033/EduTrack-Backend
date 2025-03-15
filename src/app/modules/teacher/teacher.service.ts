import bcrypt from "bcrypt";

import config from "../../config";

import { ITeacher } from "./teacher.interface";
import { Teacher } from "./teacher.model";

const createTeacher = async (teacherData: ITeacher) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(
      teacherData.password,
      parseInt(config.bcrypt_salt_rounds, 10)
    );

    // Replace the plain password with the hashed password
    const teacherWithHashedPassword = {
      ...teacherData,
      password: hashedPassword,
    };

    // Create the user
    const teacher = new Teacher(teacherWithHashedPassword);
    return await teacher.save();
  } catch (error) {
    throw new Error("Failed to create teacher");
  }
};

const getAllTeachers = async () => {
  try {
    // Retrieve all teachers who are not deleted
    return await Teacher.find({ isDeleted: false });
  } catch (error) {
    throw new Error("Failed to retrieve teachers");
  }
};

const getTeacherById = async (teacherId: string) => {
  try {
    // Find teacher by ID and check if not deleted
    const teacher = await Teacher.findOne({ _id: teacherId, isDeleted: false });
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    return teacher;
  } catch (error) {
    throw new Error("Failed to retrieve teacher");
  }
};

const deleteTeacherById = async (teacherId: string) => {
  try {
    // Find teacher by ID and check if not deleted
    const teacher = await Teacher.findOne({ _id: teacherId, isDeleted: false });
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    teacher.isDeleted = true;
    await teacher.save();
    return teacher;
  } catch (error) {
    throw new Error("Failed to delete teacher");
  }
};

const updateTeacherById = async (
  teacherId: string,
  updateData: Partial<ITeacher>
) => {
  try {
    // Find teacher by ID and check if not deleted
    const teacher = await Teacher.findOne({ _id: teacherId, isDeleted: false });
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    return await Teacher.findByIdAndUpdate(teacherId, updateData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Failed to update teacher");
  }
};

export const TeacherServices = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  deleteTeacherById,
  updateTeacherById,
};
