import { Request, Response } from "express";

import { TeacherServices } from "./teacher.service";

const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacherData = req.body;
    const teacher = await TeacherServices.createTeacher(teacherData);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully!",
      data: teacher,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to create teacher",
      error: errorMessage,
    });
  }
};

const loginTeacher = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await TeacherServices.loginTeacher(email, password);

    res.status(200).json({
      success: true,
      message: "Teacher logged in successfully!",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(401).json({
      success: false,
      message: "Failed to login",
      error: errorMessage,
    });
  }
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Both old and new passwords are required",
      });
      return;
    }

    const result = await TeacherServices.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

export const TeacherControllers = {
  loginTeacher,
  createTeacher,
  changePassword,
};
