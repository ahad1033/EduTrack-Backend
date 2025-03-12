import { z } from "zod";

// Zod schema for creating a shop
const createShopZodSchema = z.object({
  body: z.object({
    shopName: z.string({ required_error: "Shop name is required" }),
    ownerName: z.string({ required_error: "Owner name is required" }),
    phone: z.string({ required_error: "Phone is required" }),
    address: z.string({ required_error: "Address is required" }),
    userId: z.string().optional(),
  }),
});

// Zod schema for updating a shop
const updateShopZodSchema = z.object({
  body: z.object({
    shopName: z.string().optional(),
    ownerName: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    userId: z.string().optional(),
  }),
});

export const ShopValidation = {
  createShopZodSchema,
  updateShopZodSchema
};
