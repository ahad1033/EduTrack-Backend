import { Document, Schema } from "mongoose";

export interface IShop extends Document {
  shopName: string;
  ownerName: string;
  phone: string;
  address: string;
  userId?: Schema.Types.ObjectId;
}
