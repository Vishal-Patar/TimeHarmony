import { Router } from "express";
import {
    applyLeave,
    approveLeave,
    getEmployeeLeaveRequests,
    getLeaveRequests,
    rejectLeave,
    getAppliedLeaveRequests,
    deleteLeave
} from "../controllers/leaveController.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply", applyLeave);
leaveRoutes.get("/requests/:id", getLeaveRequests);
leaveRoutes.get("/applied/:id", getAppliedLeaveRequests);
leaveRoutes.post("/approve/:leaveId", approveLeave);
leaveRoutes.post("/reject/:leaveId", rejectLeave);
leaveRoutes.get("/employee/:employeeId", getEmployeeLeaveRequests);
leaveRoutes.delete("/:id", deleteLeave);

export default leaveRoutes;
