import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "super_admin" | "admin" | "user";
  phone: string;
  needPassChange?: boolean;
  shopId: Types.ObjectId;
}
