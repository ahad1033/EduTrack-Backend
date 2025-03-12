import { Request, Response } from "express";

import { Product } from "./product.model";
import { ProductServices } from "./product.service";

const generateCodes = async (req: Request, res: Response) => {
  try {
    const { count } = req.body;
    const codes = await ProductServices.generateCodes(count);

    res.status(200).json({
      success: true,
      message: "Codes generated successfully!",
      data: codes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to generate codes",
    });
  }
};

const addProducts = async (req: Request, res: Response) => {
  try {
    // Extract shopId from the token (attached by jwtMiddleware)
    const shopId = req.user?.shopId;

    if (!shopId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Shop ID not found in token",
      });
    }

    // Add shopId to the request body
    req.body.shopId = shopId;

    // Create the product
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: errorMessage,
    });
  }
};

const getProductsByShopId = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const products = await ProductServices.getProductsByShopId(shopId);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const ProductControllers = {
  addProducts,
  generateCodes,
  getProductsByShopId,
};
