import { z } from "zod";

// ZOD SCHEMA FOR CREATING A TEACHER
const createTeacherZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z.string({ required_error: "Password is required" }),
    role: z.enum(["super_admin", "teacher"], {
      required_error: "Role is required",
    }),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }),
    subject: z.string({ required_error: "Subject is required" }),
    phone: z.string({ required_error: "Phone is required" }),
    needPassChange: z.boolean().optional(),
  }),
});

// ZOD SCHEMA FOR TEACHER LOGIN
const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const TeacherValidation = {
  loginZodSchema,
  createTeacherZodSchema,
};
