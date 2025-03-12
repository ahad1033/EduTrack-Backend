import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  productID: string;
  size?: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  boughtBy: "cash" | "due";
  boughtFrom?: string;
  shopId: Types.ObjectId;
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
