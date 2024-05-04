import { Router } from "express";
import { createLeaveType, getLeaveTypes, deleteLeaveType, getLeaveTypeById, updateLeaveType } from "../controllers/leaveTypeController.js";
const leaveTypeRoutes = Router();

leaveTypeRoutes.get("/", getLeaveTypes);
leaveTypeRoutes.post("/", createLeaveType);
leaveTypeRoutes.delete("/:id", deleteLeaveType);
leaveTypeRoutes.patch("/:id", updateLeaveType);
leaveTypeRoutes.get("/:id", getLeaveTypeById);

export default leaveTypeRoutes;
