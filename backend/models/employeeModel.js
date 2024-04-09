import { Schema, model } from "mongoose";

const employeeSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    address: { type: String },
    designation: {
      type: Schema.Types.ObjectId,
      ref: "Designation",
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Employee", employeeSchema);
