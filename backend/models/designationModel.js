import { Schema, model } from "mongoose";

const designationSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Designation", designationSchema);