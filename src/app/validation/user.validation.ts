import { z } from "zod";

// Zod schema for creating a user
const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z.string({ required_error: "Password is required" }),
    role: z.enum(["super_admin", "admin", "user"], {
      required_error: "Role is required",
    }),
    phone: z.string({ required_error: "Phone is required" }),
    needPassChange: z.boolean().optional(),
    shopId: z.string({ required_error: "Shop ID is required" }),
  }),
});

// Zod schema for user login
const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const UserValidation = {
  loginZodSchema,
  createUserZodSchema,
};
