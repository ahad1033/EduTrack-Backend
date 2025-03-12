import { model, Schema } from "mongoose";

const shopSchema = new Schema(
  {
    shopName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Add a virtual `id` field
shopSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Shop = model("Shop", shopSchema);
