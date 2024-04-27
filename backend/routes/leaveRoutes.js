import { Router } from "express";
import { applyLeave, approveLeave, getEmployeeLeaveRequests, getLeaveRequests, rejectLeave } from "../controllers/leaveController.js";
const leaveRoutes = Router();

leaveRoutes.post("/apply", applyLeave);
leaveRoutes.get("/requests", getLeaveRequests);
leaveRoutes.post("/approve/:leaveId", approveLeave);
leaveRoutes.post("/reject/:leaveId", rejectLeave);
leaveRoutes.get("/employee/:employeeId", getEmployeeLeaveRequests);

export default leaveRoutes;
