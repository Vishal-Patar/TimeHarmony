import { Schema, model } from "mongoose";

const leaveSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Leave", leaveSchema);