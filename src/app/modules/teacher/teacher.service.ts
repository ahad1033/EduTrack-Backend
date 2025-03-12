import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const loginTeacher = async (email: string, password: string) => {
  try {
    // Find the user by email
    const user = await Teacher.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      config.jwt_access_secret,
      { expiresIn: parseInt(config.jwt_access_expires_in, 10) }
    );

    return { user, token };
  } catch (error) {
    throw new Error("Failed to login");
  }
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    // Find user by ID
    const user = await Teacher.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided old password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and set needPassChange to false
    user.password = hashedPassword;
    user.needPassChange = false;
    await user.save();

    // Return user info without password
    const { password, ...userWithoutPassword } = user.toObject();
    return {
      message: "Password updated successfully",
      user: userWithoutPassword,
    };
  } catch (error) {
    throw new Error("Failed to change password");
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
  loginTeacher,
  createTeacher,
  changePassword,
  getAllTeachers,
  getTeacherById,
  deleteTeacherById,
  updateTeacherById,
};
