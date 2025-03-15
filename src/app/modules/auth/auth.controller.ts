import { Request, Response } from "express";

import { AuthService } from "./auth.service";

const loginTeacher = async (req: Request, res: Response) => {
  try {
    const student = await AuthService.loginTeacher(req.body);

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      data: student,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: errorMessage,
    });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { ...passwordData } = req.body;

    const student = await AuthService.changePassword(req.teacher, passwordData);

    res.status(200).json({
      success: true,
      message: "Password is updated successfully!",
      data: student,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: errorMessage,
    });
  }
};
export const AuthController = {
  loginTeacher,
  changePassword,
};
