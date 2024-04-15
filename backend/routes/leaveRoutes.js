import { Router } from "express";
import {
  getRoles,
  createRole,
  deleteRole,
  updateRole,
  getRoleByName
} from "../controllers/roleController.js";
const leaveRoutes = Router();

// leaveRoutes.get("/", getRoles);
// leaveRoutes.post("/create", createRole);
// leaveRoutes.delete("/:id", deleteRole);
// leaveRoutes.patch("/:id", updateRole);
// leaveRoutes.get("/name/:name", getRoleByName);

export default leaveRoutes;
