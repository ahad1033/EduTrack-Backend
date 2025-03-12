import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUser } from "./user.interface";
import { User } from "./user.model";

import config from "../../config";

const createUserIntoDB = async (userData: IUser) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(
      userData.password,
      parseInt(config.bcrypt_salt_rounds, 10)
    );

    // Replace the plain password with the hashed password
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };

    // Create the user
    const user = new User(userWithHashedPassword);
    return await user.save();
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

const getUsersByShopIdFromDB = async (shopId: string) => {
  try {
    const users = await User.find({ shopId }).select("-password");
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users by shopId");
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

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
        ...(user?.role === "super_admin" ? {} : { shopId: user.shopId }),
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
    const user = await User.findById(userId);
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

export const UserServices = {
  loginUser,
  changePassword,
  createUserIntoDB,
  getUsersByShopIdFromDB,
};
