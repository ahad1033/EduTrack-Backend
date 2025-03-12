import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    productID: { type: String, required: true, unique: true },
    size: { type: String },
    category: { type: String, required: true },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    boughtBy: { type: String, enum: ["cash", "due"], required: true },
    boughtFrom: { type: String },
    shopId: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
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
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Product = model("Product", productSchema);
