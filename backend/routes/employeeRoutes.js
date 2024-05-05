import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee, getEmployeeByUserId, getReportingEmployees } from "../controllers/employeeController.js";
const employeeRoutes = Router();

employeeRoutes.get("/", getEmployees);
employeeRoutes.post("/create", createEmployee);
employeeRoutes.delete("/:id", deleteEmployee);
employeeRoutes.patch("/:id", updateEmployee);
employeeRoutes.get("/:id", getEmployeeById);
employeeRoutes.get("/user/:userId", getEmployeeByUserId);
employeeRoutes.get("/reporting/:id", getReportingEmployees);

export default employeeRoutes;
