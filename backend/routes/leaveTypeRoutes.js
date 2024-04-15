import { Router } from "express";
import { createLeaveType, getLeaveTypes } from "../controllers/leaveTypeController.js";
const leaveTypeRoutes = Router();

leaveTypeRoutes.get("/", getLeaveTypes);
leaveTypeRoutes.post("/create", createLeaveType);
// leaveTypeRoutes.delete("/:id", deleteRole);
// leaveTypeRoutes.patch("/:id", updateRole);
// leaveTypeRoutes.get("/name/:name", getRoleByName);

export default leaveTypeRoutes;
