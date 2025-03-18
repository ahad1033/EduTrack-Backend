import bcrypt from "bcrypt";

import config from "../../config";

import { Teacher } from "./teacher.model";
import { ITeacher } from "./teacher.interface";

const createTeacher = async (teacherData: ITeacher) => {
  try {
    // Check if the email already exists
    const existingTeacher = await Teacher.findOne({ email: teacherData.email });

    if (existingTeacher) {
      throw new Error("This email already exists! Please use another email.");
    }
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
    throw error;
  }
};

const getAllTeachers = async () => {
  try {
    // Retrieve all teachers who are not deleted and whose role is not super_admin
    const teachers = await Teacher.find({
      isDeleted: false,
      role: { $ne: "super_admin" },
    });

    return teachers;
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
