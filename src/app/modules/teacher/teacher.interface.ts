export interface ITeacher {
  name: string;
  email: string;
  password: string;
  role: "super_admin" | "teacher";
  gender: "male" | "female";
  subject: String;
  phone: string;
  needPassChange?: boolean;
  isDeleted?: boolean;
}
