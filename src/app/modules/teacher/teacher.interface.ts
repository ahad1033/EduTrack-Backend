import { TEACHERS_ROLE } from "./teacher.constant";

export interface ITeacher {
  name: string;
  email: string;
  password: string;
  passChangedAt?: Date;
  role: "super_admin" | "teacher";
  gender: "male" | "female";
  subject: String;
  phone: string;
  needPassChange?: boolean;
  isDeleted?: boolean;
}

export type TTeacherRole = keyof typeof TEACHERS_ROLE;
