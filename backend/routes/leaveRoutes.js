import { Router } from "express";
import { applyLeave, approveLeave, getEmployeeLeaveRequests, getLeaveRequests, rejectLeave, getAppliedLeaveRequests } from "../controllers/leaveController.js";
const leaveRoutes = Router();

leaveRoutes.post("/apply", applyLeave);
leaveRoutes.get("/requests/:id", getLeaveRequests);
leaveRoutes.get("/applied/:id", getAppliedLeaveRequests);
leaveRoutes.post("/approve/:leaveId", approveLeave);
leaveRoutes.post("/reject/:leaveId", rejectLeave);
leaveRoutes.get("/employee/:employeeId", getEmployeeLeaveRequests);

export default leaveRoutes;
