import express from "express";

import { UserControllers } from "./user.controller";
import { jwtMiddleware } from "../../middlewares/jwtMiddleware";
import { UserValidation } from "../../validation/user.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE A NEW USER
router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  UserControllers.createUser
);

// USER LOGIN
router.post(
  "/login",
  validateRequest(UserValidation.loginZodSchema),
  UserControllers.loginUser
);

// GET USERS BY SHOP ID
router.get("/get-users/:shopId", UserControllers.getUsersByShopId);

router.patch("/change-password", jwtMiddleware, UserControllers.changePassword);

export const UserRoutes = router;
