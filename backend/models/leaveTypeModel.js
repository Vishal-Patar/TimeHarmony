import { Schema, model } from "mongoose";

const leaveTypeSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    description: { type: String},
    allowedDays: { type: Number, required: true},
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("LeaveType", leaveTypeSchema);