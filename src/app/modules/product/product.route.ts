import express from "express";

import { ProductControllers } from "./product.controller";
import { jwtMiddleware } from "../../middlewares/jwtMiddleware";

const router = express.Router();

// GENERATE UNIQUE CODE FOR PRODUCT
router.post("/generate-codes", ProductControllers.generateCodes);

// ADD A PRODUCT
router.post("/add-products", jwtMiddleware, ProductControllers.addProducts);

export const ProductRoutes = router;
