import { Router } from "express";
import {
  getRoles,
  createRole,
  deleteRole,
  updateRole,
  getRoleByName
} from "../controllers/roleController.js";
const roleRoutes = Router();

roleRoutes.get("/", getRoles);
roleRoutes.post("/create", createRole);
roleRoutes.delete("/:id", deleteRole);
roleRoutes.patch("/:id", updateRole);
roleRoutes.get("/name/:name", getRoleByName);

export default roleRoutes;
