import { Product } from "./product.model";
import { IProduct } from "./product.interface";
import { generateUniqueCodes } from "../../utils/generateProductCodes";

const generateCodes = async (count: number): Promise<string[]> => {
  if (count < 1 || count > 20) {
    throw new Error("Count must be between 1 to 20");
  }
  return generateUniqueCodes(count);
};

const addProducts = async (products: IProduct[]) => {
  const createdProducts = await Product.insertMany(products);
  return createdProducts;
};

const getProductsByShopId = async (shopId: string) => {
  const products = await Product.find({ shopId });
  return products;
};

export const ProductServices = {
  addProducts,
  generateCodes,
  getProductsByShopId,
};
