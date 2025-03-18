import { model, Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    passChangedAt: { type: Date },
    role: {
      type: String,
      enum: ["super_admin", "teacher"],
      default: "teacher",
    },
    gender: { type: String, enum: ["male", "female"] },
    subject: { type: String },
    phone: { type: String },
    address: { type: String },
    needPassChange: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
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
teacherSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Teacher = model("Teacher", teacherSchema);
