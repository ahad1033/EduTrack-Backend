import { z } from "zod";

// Zod schema for creating a product
const createProductZodSchema = z.object({
  body: z.object({
    productID: z.string({ required_error: "Product ID is required" }),
    size: z.string().optional(),
    category: z.string({ required_error: "Category is required" }),
    buyingPrice: z.number({ required_error: "Buying price is required" }),
    sellingPrice: z.number({ required_error: "Selling price is required" }),
    boughtBy: z.enum(["cash", "due"], {
      required_error:
        "Bought by is required and must be either 'cash' or 'due'",
    }),
    boughtFrom: z.string().optional(),
  }),
});

// Zod schema for updating a product
const updateProductZodSchema = z.object({
  body: z.object({
    productID: z.string().optional(),
    size: z.string().optional(),
    category: z.string().optional(),
    buyingPrice: z.number().optional(),
    sellingPrice: z.number().optional(),
    boughtBy: z.enum(["cash", "due"]).optional(),
    boughtFrom: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
