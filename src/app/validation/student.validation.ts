import { z } from "zod";

const createStudentZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string().nonempty("Phone number is required"),
  email: z.string().email("Invalid email format").optional(),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender must be either 'male' or 'female'" }),
  }),
  class: z.string().nonempty("Class is required"),
  roll: z
    .number()
    .int("Roll number must be an integer")
    .positive("Roll number must be positive"),
  fathersName: z.string().nonempty("Father's name is required"),
  mothersName: z.string().nonempty("Mother's name is required"),
  address: z.string().nonempty("Address is required"),
  isDeleted: z.boolean().optional(),
});

const editStudentZodSchema = z.object({
  name: z.string().nonempty("Name is required").optional(),
  phone: z.string().nonempty("Phone number is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  gender: z
    .enum(["male", "female"], {
      errorMap: () => ({ message: "Gender must be either 'male' or 'female'" }),
    })
    .optional(),
  class: z.string().nonempty("Class is required").optional(),
  roll: z
    .number()
    .int("Roll number must be an integer")
    .positive("Roll number must be positive")
    .optional(),
  fathersName: z.string().nonempty("Father's name is required").optional(),
  mothersName: z.string().nonempty("Mother's name is required").optional(),
  address: z.string().nonempty("Address is required").optional(),
  isDeleted: z.boolean().optional(),
});

export const StudentValidation = {
  editStudentZodSchema,
  createStudentZodSchema,
};
