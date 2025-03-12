import { model, Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    gender: { type: String, enum: ["male", "female"] },
    phone: { type: String, required: true },
    class: { type: String, required: true },
    roll: { type: Number, required: true },
    fathersName: { type: String, required: true },
    mothersName: { type: String, required: true },
    address: { type: String, required: true },
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
studentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Student = model("Student", studentSchema);
