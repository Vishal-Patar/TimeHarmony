import { Router } from "express";
import { checkIn, checkOut, getAttendance, getAllAttendance, isCheckIn } from "../controllers/attendanceController.js";
const attendanceRoutes = Router();

attendanceRoutes.get("/", getAllAttendance);
attendanceRoutes.get("/:employeeId", getAttendance);
attendanceRoutes.get("/ischeckin/:employeeId", isCheckIn);
attendanceRoutes.post("/checkin/:employeeId", checkIn);
attendanceRoutes.post("/checkout/:employeeId", checkOut);

export default attendanceRoutes;
