import { Request, Response } from "express";
import { ShopServices } from "./shop.service";

const createShop = async (req: Request, res: Response) => {
  try {
    const shopData = req.body;
    const shop = await ShopServices.createShop(shopData);

    res.status(201).json({
      success: true,
      message: "Shop created successfully!",
      data: shop,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to create shop",
      error: errorMessage,
    });
  }
};

const getAllShop = async (req: Request, res: Response) => {
  try {
    const shops = await ShopServices.getAllShop();

    res.status(200).json({
      success: true,
      message: "Shops fetched successfully!",
      data: shops,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch shops",
      error: errorMessage,
    });
  }
};

const getShopById = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const shop = await ShopServices.getShopById(shopId);

    res.status(200).json({
      success: true,
      message: "Shop fetched successfully!",
      data: shop,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch shop",
      error: errorMessage,
    });
  }
};

const updateShopById = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const updateData = req.body;
    const shop = await ShopServices.updateShopById(shopId, updateData);

    res.status(200).json({
      success: true,
      message: "Shop updated successfully!",
      data: shop,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to update shop",
      error: errorMessage,
    });
  }
};

const deleteShopById = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const shop = await ShopServices.deleteShopById(shopId);

    res.status(200).json({
      success: true,
      message: "Shop deleted successfully!",
      data: shop,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete shop",
      error: errorMessage,
    });
  }
};

const getShopsWithoutUser = async (req: Request, res: Response) => {
  try {
    const shops = await ShopServices.getShopsWithoutUser();

    res.status(200).json({
      success: true,
      message: "Shops fetched successfully!",
      data: shops,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch shops",
      error: errorMessage,
    });
  }
};

export const ShopController = {
  createShop,
  getAllShop,
  getShopById,
  updateShopById,
  deleteShopById,
  getShopsWithoutUser,
};
