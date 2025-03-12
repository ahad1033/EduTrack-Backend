import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["super_admin", "admin", "user"],
      default: "user",
    },
    phone: { type: String },
    needPassChange: { type: Boolean, default: true },
    shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
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
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const User = model("User", userSchema);
