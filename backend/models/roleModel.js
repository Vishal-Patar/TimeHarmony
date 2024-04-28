import { Schema, model } from "mongoose";

const permissionSchema = new Schema({
  id: { type: Number, required: true },
  section: { type: String, required: true },
  readAccess: { type: Boolean, default: false },
  writeAccess: { type: Boolean, default: false },
});

const roleSchema = Schema(
  {
    name: { type: String, required: true, unique: true }, // Ensure role names are unique
    label: { type: String, required: true }, // Add label field
    permissions: [permissionSchema], // Array of permissions
  },
  {
    timestamps: true,
  }
);

export default model("Role", roleSchema);
