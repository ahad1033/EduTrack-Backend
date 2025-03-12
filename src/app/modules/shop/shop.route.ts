import express from "express";

import { ShopController } from "./shop.controller";
import { ShopValidation } from "../../validation/shop.validation";
import { authMiddleware } from "../../middlewares/authMiddleware";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-shop",
  authMiddleware("super_admin"),
  validateRequest(ShopValidation.createShopZodSchema),
  ShopController.createShop
);

// GET ALL SHOP
router.get("/", authMiddleware("super_admin"), ShopController.getAllShop);

// GET SINGLE SHOP
router.get(
  "/:shopId",
  authMiddleware("super_admin"),
  ShopController.getShopById
);

// UPDATE A SHOP
router.patch(
  "/:shopId",
  authMiddleware("super_admin"),
  validateRequest(ShopValidation.updateShopZodSchema),
  ShopController.updateShopById
);

// DELETE SHOP
router.delete(
  "/:shopId",
  authMiddleware("super_admin"),
  ShopController.deleteShopById
);

// GET AVAILABLE SHOPS
router.get(
  "/unassigned",
  authMiddleware("super_admin"),
  ShopController.getShopsWithoutUser
);

export const ShopRoutes = router;
