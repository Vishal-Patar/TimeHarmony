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
    reportingManager: {
      type: Schema.Types.ObjectId,
      ref: 'Employee', // Reference to another Employee document
    },
  },
  {
    timestamps: true,
  }
);

export default model("Employee", employeeSchema);
