import { Request, Response } from "express";

import { Shop } from "../shop/shop.model";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await UserServices.createUserIntoDB(userData);

    // If the user is an admin, update the shop with the adminId
    if (user?.role === "admin" && user?.shopId) {
      await Shop.findByIdAndUpdate(user.shopId, { userId: user.id });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: errorMessage,
    });
  }
};

const getUsersByShopId = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const users = await UserServices.getUsersByShopIdFromDB(shopId);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: users,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch users by shopId",
      error: errorMessage,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await UserServices.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
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

    const result = await UserServices.changePassword(
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

export const UserControllers = {
  loginUser,
  createUser,
  changePassword,
  getUsersByShopId,
};
